import { AbiItem } from 'web3-utils';
import { web3Provider } from './web3Service';
import { SUPPORTED_TOKENS } from '../config/tokens';

const ERC20_ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  }
];

export class ERC20Service {
  async getTokenBalance(
    chainName: string, 
    tokenAddress: string, 
    walletAddress: string
  ): Promise<string> {
    try {
      const web3 = web3Provider.getProvider(chainName);
      const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
      
      const balance = await contract.methods.balanceOf(walletAddress).call();
      return String(balance);
    } catch (error) {
      console.error(`Error fetching token balance:`, error);
      throw error;
    }
  }

  async getTokenDecimals(chainName: string, tokenAddress: string): Promise<number> {
    try {
      const web3 = web3Provider.getProvider(chainName);
      const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
      const decimals = await contract.methods.decimals().call();
      return Number(decimals);
    } catch (error) {
      console.error(`Error fetching token decimals:`, error);
      throw error;
    }
  }

  async getTokenSymbol(chainName: string, tokenAddress: string): Promise<string> {
    try {
      const web3 = web3Provider.getProvider(chainName);
      const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
      return await contract.methods.symbol().call();
    } catch (error) {
      console.error(`Error fetching token symbol:`, error);
      throw error;
    }
  }

  async getTokenBalances(chainName: string, walletAddress: string): Promise<{ symbol: string, balance: string, coinGeckoId: string, logoUrl: string}[]> {  
    try {
      const balances = await Promise.all(SUPPORTED_TOKENS.filter((token) => token.chainName === chainName).map(async (token) => {
        try {
          const balanceInUnit = await this.getTokenBalance(chainName, token.address, walletAddress);
          const decimals = await this.getTokenDecimals(chainName, token.address);
          const balanceInDec = web3Provider.getProvider(chainName).utils.fromWei(balanceInUnit, decimals);
          return {
            symbol: token.symbol,
            balance: balanceInDec,
            coinGeckoId: token.coinGeckoId,
            logoUrl: token.logoUrl
          };
        } catch (error) {
          console.error(`Error processing token ${token.symbol}:`, error);
          // Return a zero balance for failed tokens instead of failing the entire request
          return {
            symbol: token.symbol,
            balance: '0',
            coinGeckoId: token.coinGeckoId,
            logoUrl: token.logoUrl
          };
        }
      }));
      return balances;
    } catch (error) {
      console.error('Error fetching token balances:', error);
      throw error;
    }
  }
}

export const erc20Service = new ERC20Service();
