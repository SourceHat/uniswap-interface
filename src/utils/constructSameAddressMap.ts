import { SupportedChainId } from '../constants/chains'

export function constructSameAddressMap<T extends string>(
  address: T,
  includeArbitrum: boolean
): { [chainId: number]: T } {
  if (includeArbitrum)
    return {
      [SupportedChainId.MAINNET]: address,
      [SupportedChainId.SEPOLIA]: address,
    }
  return {
    [SupportedChainId.MAINNET]: address,
    [SupportedChainId.SEPOLIA]: address,
  }
}
