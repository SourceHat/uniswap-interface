// Copied from https://github.com/Uniswap/interface/blob/main/src/constants/tokens.ts
import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import { UNI_ADDRESS } from './addresses'
import { ChainId, isPolygonChain } from './chains'

export const AMPL = new Token(
  ChainId.Mainnet,
  '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
  9,
  'AMPL',
  'Ampleforth'
)
export const DAI = new Token(
  ChainId.Mainnet,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const DAI_ARBITRUM_ONE = new Token(
  ChainId.ArbitrumOne,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai stable coin'
)
export const USDC = new Token(
  ChainId.Mainnet,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
)
export const USDC_ARBITRUM = new Token(
  ChainId.ArbitrumOne,
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  6,
  'USDC',
  'USD//C'
)
export const USDC_OPTIMISM = new Token(
  ChainId.Optimism,
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  6,
  'USDC',
  'USD//C'
)
export const USDC_POLYGON = new Token(
  ChainId.Polygon,
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  6,
  'USDC',
  'USD//C'
)

export const USDC_GOERLI = new Token(
  ChainId.Polygon,
  '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  6,
  'USDC',
  'USD//C'
)

export const USDT = new Token(
  ChainId.Mainnet,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD'
)

export const WBTC = new Token(
  ChainId.Mainnet,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
)

export const UNI: { [chainId: number]: Token } = {
  [ChainId.Mainnet]: new Token(ChainId.Mainnet, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap'),
  [ChainId.Goerli]: new Token(ChainId.Goerli, UNI_ADDRESS[5], 18, 'UNI', 'Uniswap'),
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token } = {
  ...WETH9,
  [ChainId.Optimism]: new Token(
    ChainId.Optimism,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ArbitrumOne]: new Token(
    ChainId.ArbitrumOne,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.Polygon]: new Token(
    ChainId.Polygon,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [ChainId.PolygonMumbai]: new Token(
    ChainId.PolygonMumbai,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
}

class MaticNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isPolygonChain(this.chainId)) throw new Error('Not matic')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isPolygonChain(chainId)) throw new Error('Not matic')
    super(chainId, 18, 'MATIC', 'Polygon Matic')
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    )
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId]
  let nativeCurrency: NativeCurrency | Token
  if (isPolygonChain(chainId)) {
    nativeCurrency = new MaticNativeCurrency(chainId)
  } else {
    nativeCurrency = ExtendedEther.onChain(chainId)
  }
  return (cachedNativeCurrency[chainId] = nativeCurrency)
}
