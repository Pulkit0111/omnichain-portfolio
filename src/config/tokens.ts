export interface TokenConfig {
    address: string;
    chainId: number;
    chainName: string;
    name: string;
    symbol: string;
    decimals: number;
    coinGeckoId: string;
}

export const SUPPORTED_TOKENS: TokenConfig[] = [
    {
        address: '0x60f67e1015b3f069dd4358a78c38f83fe3a667a9',
        chainId: 1,
        chainName: 'ethereum',
        name: 'Route',
        symbol: 'ROUTE',
        decimals: 18,
        coinGeckoId: 'router-protocol-2'
    },
    {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        chainId: 1,
        chainName: 'ethereum',
        name: 'USD coin',
        symbol: 'USDC',
        decimals: 6,
        coinGeckoId: 'usd-coin'
    },
    {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        chainId: 1,
        chainName: 'ethereum',
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        coinGeckoId: 'tether'
    },
    {
        address: '0x93890f346c5d02c3863a06657bc72555dc72c527',
        chainId: 137,
        chainName: 'polygon',
        name: 'Route',
        symbol: 'ROUTE',
        decimals: 18,
        coinGeckoId: 'router-protocol-2'
    },
    {
        address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        chainId: 137,
        chainName: 'polygon',
        name: 'USD coin',
        symbol: 'USDC',
        decimals: 6,
        coinGeckoId: 'usd-coin'
    },
    {
        address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        chainId: 137,
        chainName: 'polygon',
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        coinGeckoId: 'tether'
    }
]

