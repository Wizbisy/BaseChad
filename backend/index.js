// backend/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import { readContract, writeContract } from '@wagmi/core';
import { contractAddress, abi } from './contract.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());

// CORS for your frontend
app.use(cors({
    origin: 'https://base-chads.vercel.app',
    credentials: true
}));

// Session middleware
app.use(session({
    secret: 'dc90c9e11b3408991e126ce94b8f9088de0b76d7b1dae7e740dc71700d39584a28d143845a2d159daee22f300530cf40ef6f12dc69e9c607f1c53c645989e77d',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    }
}));

// Backend config for Wagmi
const config = {
    chains: [], // your base chain config
    // any other Wagmi config needed
};

// Contract config
const contractConfig = { address: contractAddress, abi };

// Account endpoint
app.get('/account', (req, res) => {
    const isConnected = !!req.session.connected;
    const address = process.env.SERVER_WALLET_ADDRESS || '';
    res.json({ isConnected, address });
});

// Connect / disconnect
app.post('/connect', (req, res) => {
    req.session.connected = true;
    res.json({ success: true });
});

app.post('/disconnect', (req, res) => {
    req.session.connected = false;
    res.json({ success: true });
});

// Contract data
app.get('/contract-data', async (req, res) => {
    try {
        const address = req.query.address;
        const maxSupply = await readContract(config, {
            ...contractConfig,
            functionName: 'MAX_SUPPLY'
        });
        const totalMinted = await readContract(config, {
            ...contractConfig,
            functionName: 'totalMinted'
        });

        let yourMinted = 0n;
        if (address) {
            yourMinted = await readContract(config, {
                ...contractConfig,
                functionName: 'mintedPerWallet',
                args: [address]
            });
        }

        res.json({
            maxSupply: maxSupply.toString(),
            totalMinted: totalMinted.toString(),
            yourMinted: yourMinted.toString()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mint NFT
app.post('/mint', async (req, res) => {
    try {
        const price = await readContract(config, {
            ...contractConfig,
            functionName: 'price'
        });

        const hash = await writeContract(config, {
            ...contractConfig,
            functionName: 'mint',
            value: price
        });

        res.json({ hash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
