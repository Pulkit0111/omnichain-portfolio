"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_CHAINS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.SUPPORTED_CHAINS = {
    ethereum: {
        chainId: 1,
        name: 'ethereum',
        rpcUrl: process.env.ETH_RPC_URL,
        nativeToken: {
            symbol: 'ETH',
            decimals: 18,
            coinGeckoId: 'ethereum'
        }
    },
    polygon: {
        chainId: 137,
        name: 'polygon',
        rpcUrl: process.env.POLYGON_RPC_URL,
        nativeToken: {
            symbol: 'POL',
            decimals: 18,
            coinGeckoId: 'matic-network'
        }
    }
};
