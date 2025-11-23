import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

// Note: The 403 error from api.web3modal.org is expected when using 'default-project-id'
// The app will use local defaults and function normally.
// To remove the warning, get a free WalletConnect project ID from https://cloud.walletconnect.com
// and set it as NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID in your .env file

export const wagmiConfig = getDefaultConfig({
  appName: "Table d'Adrian Wellness",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'default-project-id',
  chains: [base],
  ssr: true,
});

