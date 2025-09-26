import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import { readContract } from '@wagmi/core';
import { contractAddress, abi } from './contract.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve frontend (optional)
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());

// CORS only for your frontend
app.use(cors({
    origin: 'https://base-chads.vercel.app',
    credentials: true
}));

// Session (for UI purposes only)
app.use(session({
    secret: 'dc90c9e11b3408991e126ce94b8f9088de0b76d7b1dae7e740dc71700d39584a28d143845a2d159daee22f300530cf40ef6f12dc69e9c607f1c53c645989e77d',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
}));

// Base chain config
const baseChain = {
    id: 8453,
    name: 'Base',
    network: 'base',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
    rpcUrls: { default: { http: ['https://mainnet.base.org'] } },
    blockExplorers: { default: { name: 'BaseScan', url: 'https://basescan.org' } },
    testnet: false,
};

// Contract config
const contractConfig = { address: contractAddress, abi };

// Connect / disconnect session (UI only)
app.post('/connect', (req, res) => {
    req.session.connected = true;
    res.json({ success: true });
});

app.post('/disconnect', (req, res) => {
    req.session.connected = false;
    res.json({ success: true });
});

// Return session state
app.get('/account', (req, res) => {
    const isConnected = !!req.session.connected;
    res.json({ isConnected, address: '' }); // frontend handles wallet address
});

// Read-only contract data
app.get('/contract-data', async (req, res) => {
    try {
        const userAddress = req.query.address;

        const maxSupply = await readContract({
            ...contractConfig,
            functionName: 'MAX_SUPPLY',
            chainId: baseChain.id
        });

        const totalMinted = await readContract({
            ...contractConfig,
            functionName: 'totalMinted',
            chainId: baseChain.id
        });

        let yourMinted = 0n;
        if (userAddress) {
            yourMinted = await readContract({
                ...contractConfig,
                functionName: 'mintedPerWallet',
                args: [userAddress],
                chainId: baseChain.id
            });
        }

        res.json({
            maxSupply: maxSupply.toString(),
            totalMinted: totalMinted.toString(),
            yourMinted: yourMinted.toString()
        });
    } catch (err) {
        console.error('Contract data error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
