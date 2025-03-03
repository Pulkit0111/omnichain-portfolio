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
      coinGeckoId: 'ethereum'
    }
  },
  polygon: {
    chainId: 137,
    name: 'polygon',
    rpcUrl: process.env.POLYGON_RPC_URL as string,
    nativeToken: {
      symbol: 'POL',
      decimals: 18,
      coinGeckoId: 'matic-network'
    }
  }
}
