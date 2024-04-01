export enum SupportedChainId {
  MAINNET = 1,
  SEPOLIA = 11155111,
  BASE_SEPOLIA = 84532,
}

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.SEPOLIA]: 'Sepolia',
  [SupportedChainId.BASE_SEPOLIA]: 'Base Sepolia',
}
