'use strict';

import { SupportedChainId } from 'constants/chains'

// Object.defineProperty(exports, '__esModule', { value: true });

// function _interopDefault (ex: { [x: string]: any; }) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

type AddressMap = { [chainId: number]: string }

var solidity = require('@ethersproject/solidity');
var address = require('@ethersproject/address');

const initHashes: AddressMap = {[SupportedChainId.SEPOLIA]: '0x4156ccc01dad273e6c65c4335c428a2ff4a4b0c95a9a228f6bfed45a069d3fe7', 
                                [SupportedChainId.BASE_SEPOLIA]: '0xeae33bc258560cf23b48dbe95209a6b4d6293ec42cdbea3e3471e5360f8af8a2'}

// var INIT_CODE_HASH = '0x4156ccc01dad273e6c65c4335c428a2ff4a4b0c95a9a228f6bfed45a069d3fe7';
// var INIT_CODE_HASH = '0xeae33bc258560cf23b48dbe95209a6b4d6293ec42cdbea3e3471e5360f8af8a2';

export var computePairAddress = function computePairAddress(_ref: { factoryAddress: any; tokenA: any; tokenB: any; chainId: any}) {
    var factoryAddress = _ref.factoryAddress,
        tokenA = _ref.tokenA,
        tokenB = _ref.tokenB;
  
    var _ref2 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
        token0 = _ref2[0],
        token1 = _ref2[1]; // does safety checks
  
    var INIT_CODE_HASH = initHashes[_ref.chainId];
  
    return address.getCreate2Address(factoryAddress, solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [token0.address, token1.address])]), INIT_CODE_HASH);
  };

// exports.computePairAddress = computePairAddress;