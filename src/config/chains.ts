import { config } from 'dotenv';

config();

export interface ChainConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  nativeToken: {
    symbol: string;
    decimals: number;
    coinGeckoId: string; //for fetching price from coinGecko
    logoUrl: string;
  };
}

export const SUPPORTED_CHAINS: { [key: string]: ChainConfig } = {
  ethereum: {
    chainId: 1,
    name: 'ethereum',
    rpcUrl: process.env.ETH_RPC_URL as string,
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
    rpcUrl: process.env.POLYGON_RPC_URL as string,
    nativeToken: {
      symbol: 'POL',
      decimals: 18,
      coinGeckoId: 'matic-network',
      logoUrl: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png?1698233745'
    }
  }
}
