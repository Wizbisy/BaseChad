// backend/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base } from '@reown/appkit/networks';
import { getAccount, readContract } from '@wagmi/core';
import { contractAddress, abi } from './contract.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Allow only your frontend
app.use(cors({
  origin: 'https://base-chads.vercel.app'
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// ===== Reown setup =====
const projectId = 'b39e54b774beba416b97f399ba3777e8';

const networks = [base];

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
});

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

// ===== API endpoints =====

// Get connected account info
app.get('/account', async (req, res) => {
  try {
    const account = getAccount(config);
    res.json({
      isConnected: account.isConnected,
      address: account.address || ''
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get contract data
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

// Optional: trigger wallet modal (only for session management)
app.post('/connect', async (req, res) => {
  try {
    await modal.open();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: disconnect wallet session
app.post('/disconnect', async (req, res) => {
  try {
    await modal.disconnect();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
