import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  [SupportedChainId.SEPOLIA]: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 
  [SupportedChainId.BASE_SEPOLIA]: '0x3298e4a83fB1E7af3C557bE074e2992861aeEB04'}

export const MULTICALL2_ADDRESSES: AddressMap ={[SupportedChainId.SEPOLIA]: '0x43cDB3cb3cD47727B0C25f01bcB27fa822668544', 
                                                [SupportedChainId.BASE_SEPOLIA]: '0x3f70b2452e5A122C37Bc38a66262714E7Fc9355E'}
export const V2_FACTORY_ADDRESSES: AddressMap = {[SupportedChainId.SEPOLIA]: '0x7E0987E5b3a30e3f2828572Bb659A548460a3003', 
                                                [SupportedChainId.BASE_SEPOLIA]: '0x3579357Ffc5B1b15778a004709Be5bb6B10B88b7'}
export const V2_ROUTER_ADDRESS: AddressMap = {[SupportedChainId.SEPOLIA]: '0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008', 
                                              [SupportedChainId.BASE_SEPOLIA]: '0x6682375ebC1dF04676c0c5050934272368e6e883'}

// most current governance contract address should always be the 0 index
// only support governance on mainnet
export const GOVERNANCE_ADDRESSES: AddressMap[] = [
  {
    [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
  },
  {
    [SupportedChainId.MAINNET]: '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F',
  },
]
export const TIMELOCK_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC',
}

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V3_FACTORY_ADDRESS, true)
export const QUOTER_ADDRESSES: AddressMap = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', true)
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = constructSameAddressMap(
  '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  true
)
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap(
  '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  true
)
export const V3_MIGRATOR_ADDRESSES: AddressMap = constructSameAddressMap(
  '0xA5644E29708357803b5A882D272c41cC0dF92B34',
  true
)
