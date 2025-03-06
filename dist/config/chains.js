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
            coinGeckoId: 'ethereum',
            logoUrl: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png?1696501628'
        }
    },
    polygon: {
        chainId: 137,
        name: 'polygon',
        rpcUrl: process.env.POLYGON_RPC_URL,
        nativeToken: {
            symbol: 'POL',
            decimals: 18,
            coinGeckoId: 'matic-network',
            logoUrl: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png?1698233745'
        }
    }
};
