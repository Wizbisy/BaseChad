import { createAppKit } from 'https://cdn.skypack.dev/@reown/appkit';
import { WagmiAdapter } from 'https://cdn.skypack.dev/@reown/appkit-adapter-wagmi';
import { base } from 'https://cdn.skypack.dev/@reown/appkit/networks';
import { getAccount, watchAccount, readContract, writeContract } from 'https://cdn.skypack.dev/@wagmi/core';

const projectId = 'b39e54b774beba416b97f399ba3777e8';

const networks = [base];

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
});

const metadata = {
  name: 'Chad NFT',
  description: 'Chad NFT Mint Page',
  url: 'https://ipfs.io/ipfs/bafkreif3in6wmhvrcfi26fvojixolla4yhvegltbwvean4sldjju72obo4', 
  icons: [] 
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional
  }
});

const config = wagmiAdapter.wagmiConfig;

const contractAddress = '0x33865EB37644bBCDb106b5f572FF4C4bE2B2B3DF';

const abi = [{"inputs":[{"internalType":"string","name":"initialBaseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"numerator","type":"uint256"},{"internalType":"uint256","name":"denominator","type":"uint256"}],"name":"ERC2981InvalidDefaultRoyalty","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC2981InvalidDefaultRoyaltyReceiver","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"numerator","type":"uint256"},{"internalType":"uint256","name":"denominator","type":"uint256"}],"name":"ERC2981InvalidTokenRoyalty","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC2981InvalidTokenRoyaltyReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAX_PER_WALLET","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mintedPerWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"ownerMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const contractConfig = {
  address: contractAddress,
  abi
};

// UI elements
const walletHeader = document.querySelector('.wallet-connect-header');
const connectButton = document.querySelector('.action-button.wallet-connect');
const nftImage = document.querySelector('.nft-image');
const totalNftsInfo = document.querySelector('.nft-info:nth-of-type(1)');
const mintedNftsInfo = document.querySelector('.nft-info:nth-of-type(2)');
const yourMintedInfo = document.querySelector('.nft-info:nth-of-type(3)');

// Create mint button
const mintButton = document.createElement('button');
mintButton.className = 'action-button mint';
mintButton.textContent = 'Mint NFT';
mintButton.style.display = 'none';
connectButton.parentNode.insertBefore(mintButton, connectButton.nextSibling);

// Set NFT image
nftImage.style.backgroundImage = `url('https://ipfs.io/ipfs/bafkreif3in6wmhvrcfi26fvojixolla4yhvegltbwvean4sldjju72obo4')`;
nftImage.style.backgroundSize = 'cover';
nftImage.style.backgroundPosition = 'center';

// Function to shorten address
function shortenAddress(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
}

// Update NFT info
async function updateInfo() {
  try {
    const account = getAccount(config);
    const isConnected = account.isConnected;
    const address = account.address;

    if (isConnected) {
      walletHeader.textContent = shortenAddress(address);
      walletHeader.classList.add('connected');
      connectButton.style.display = 'none';
      mintButton.style.display = 'block';
    } else {
      walletHeader.textContent = 'Connect Wallet';
      walletHeader.classList.remove('connected');
      connectButton.style.display = 'block';
      mintButton.style.display = 'none';
    }

    const maxSupply = await readContract(config, {
      ...contractConfig,
      functionName: 'MAX_SUPPLY'
    });

    const totalMinted = await readContract(config, {
      ...contractConfig,
      functionName: 'totalMinted'
    });

    let yourMinted = 0n;
    if (isConnected) {
      yourMinted = await readContract(config, {
        ...contractConfig,
        functionName: 'mintedPerWallet',
        args: [address]
      });
    }

    totalNftsInfo.textContent = `Total NFTs: ${maxSupply.toString()}`;
    mintedNftsInfo.textContent = `NFTs Minted: ${totalMinted.toString()}`;
    yourMintedInfo.textContent = `Your NFTs Minted: ${yourMinted.toString()}`;
  } catch (err) {
    console.error('Update info error:', err);
  }
}

// Mint NFT
async function mintNFT() {
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

    console.log('Transaction hash:', hash);
    await updateInfo();
  } catch (err) {
    console.error('Mint error:', err);
  }
}

// Event listeners
walletHeader.addEventListener('click', () => {
  const account = getAccount(config);
  if (!account.isConnected) {
    modal.open();
  } else {
    modal.open({ view: 'Account' });
  }
});

connectButton.addEventListener('click', () => modal.open());

mintButton.addEventListener('click', mintNFT);

watchAccount(config, {
  onChange: updateInfo
});

// Initial update
updateInfo();
