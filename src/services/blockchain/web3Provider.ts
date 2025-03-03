import Web3 from 'web3';
import { SUPPORTED_CHAINS } from '../../config/chains';

class Web3Provider {
  private providers: { [key: string]: Web3 } = {};

  constructor() {
    // Initialize Web3 instances for each chain
    Object.entries(SUPPORTED_CHAINS).forEach(([chainName, chainConfig]) => {
      this.providers[chainName] = new Web3(new Web3.providers.HttpProvider(chainConfig.rpcUrl));
    });
  }

  getProvider(chainName: string): Web3 {
    const provider = this.providers[chainName];
    if (!provider) {
      throw new Error(`No provider found for chain: ${chainName}`);
    }
    return provider;
  }

  async getNativeBalance(chainName: string, address: string): Promise<string> {
    try {
      const web3 = this.getProvider(chainName);
      const balanceInUnit = await web3.eth.getBalance(address);
      const balanceInDec = web3.utils.fromWei(balanceInUnit, 'ether');
      return balanceInDec;
    } catch (error) {
      console.error(`Error fetching balance for ${chainName}:`, error);
      throw error;
    }
  }
}

export const web3Provider = new Web3Provider(); 