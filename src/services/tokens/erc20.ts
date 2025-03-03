import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { web3Provider } from '../blockchain/web3Provider';
import { SUPPORTED_TOKENS } from '../../config/tokens';

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
    const web3 = web3Provider.getProvider(chainName);
    const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    const decimals = await contract.methods.decimals().call();
    return Number(decimals);
  }

  async getTokenSymbol(chainName: string, tokenAddress: string): Promise<string> {
    const web3 = web3Provider.getProvider(chainName);
    const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    return await contract.methods.symbol().call();
  }

  async getTokenBalances(walletAddress: string): Promise<{ symbol: string, balance: string}[]> {  
    const balances = await Promise.all(SUPPORTED_TOKENS.map(async (token) => {
      const balanceInUnit = await this.getTokenBalance(token.chainName, token.address, walletAddress);
      const decimals = await this.getTokenDecimals(token.chainName, token.address);
      const balanceInDec = web3Provider.getProvider(token.chainName).utils.fromWei(balanceInUnit, decimals);
      return {
        symbol: token.symbol,
        balance: balanceInDec
      };
    }));
    return balances;
  }
}

export const erc20Service = new ERC20Service();
