import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base } from '@reown/appkit/networks';
import { getAccount, readContract, writeContract } from '@wagmi/core';
import dotenv from 'dotenv';
import session from 'express-session';
import { contractAddress, abi } from './contract.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// CORS for your frontend
app.use(cors({
  origin: 'https://base-chads.vercel.app',
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Session for user tracking
app.use(session({
  secret: process.env.SESSION_SECRET || 'dc90c9e11b3408991e126ce94b8f9088de0b76d7b1dae7e740dc71700d39584a28d143845a2d159daee22f300530cf40ef6f12dc69e9c607f1c53c645989e77d',
  resave: false,
  saveUninitialized: true
}));

const projectId = process.env.PROJECT_ID;
const networks = [base];

const wagmiAdapter = new WagmiAdapter({ projectId, networks });

const metadata = {
  name: 'Chad NFT',
  description: 'Chad NFT Mint Page',
  url: process.env.APP_URL || 'http://localhost:3000',
  icons: []
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: { analytics: true }
});

const config = wagmiAdapter.wagmiConfig;
const contractConfig = { address: contractAddress, abi };

// API endpoints

// Account info
app.get('/account', async (req, res) => {
  try {
    const account = getAccount(config); // server wallet
    res.json({
      isConnected: account.isConnected,
      address: account.address || ''
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contract data
app.get('/contract-data', async (req, res) => {
  try {
    const address = req.query.address || '';
    const maxSupply = await readContract(config, { ...contractConfig, functionName: 'MAX_SUPPLY' });
    const totalMinted = await readContract(config, { ...contractConfig, functionName: 'totalMinted' });

    let yourMinted = 0n;
    if (address) {
      yourMinted = await readContract(config, { ...contractConfig, functionName: 'mintedPerWallet', args: [address] });
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

// Mint NFT via server wallet
app.post('/mint', async (req, res) => {
  try {
    const price = await readContract(config, { ...contractConfig, functionName: 'price' });
    const hash = await writeContract(config, { ...contractConfig, functionName: 'mint', value: price });
    res.json({ hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
