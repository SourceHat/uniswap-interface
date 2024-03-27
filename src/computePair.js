'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var solidity = require('@ethersproject/solidity');
var address = require('@ethersproject/address');

var FACTORY_ADDRESS = '0x7E0987E5b3a30e3f2828572Bb659A548460a3003';
var INIT_CODE_HASH = '0x4156ccc01dad273e6c65c4335c428a2ff4a4b0c95a9a228f6bfed45a069d3fe7';

var computePairAddress = function computePairAddress(_ref) {
    var factoryAddress = _ref.factoryAddress,
        tokenA = _ref.tokenA,
        tokenB = _ref.tokenB;
  
    var _ref2 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
        token0 = _ref2[0],
        token1 = _ref2[1]; // does safety checks
  
  
    return address.getCreate2Address(factoryAddress, solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [token0.address, token1.address])]), INIT_CODE_HASH);
  };

exports.computePairAddress = computePairAddress;