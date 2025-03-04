import Web3 from 'web3';
import { SUPPORTED_CHAINS } from '../config/chains';

class Web3Provider {
  private providers: { [key: string]: Web3 } = {};

  constructor() {
    try {
      // Initialize Web3 instances for each chain
      Object.entries(SUPPORTED_CHAINS).forEach(([chainName, chainConfig]) => {
        try {
          this.providers[chainName] = new Web3(new Web3.providers.HttpProvider(chainConfig.rpcUrl));
        } catch (error) {
          console.error(`Error initializing provider for chain ${chainName}:`, error);
          throw error;
        }
      });
    } catch (error) {
      console.error('Error in Web3Provider constructor:', error);
      throw error;
    }
  }

  getProvider(chainName: string): Web3 {
    try {
      const provider = this.providers[chainName];
      if (!provider) {
        throw new Error(`No provider found for chain: ${chainName}`);
      }
      return provider;
    } catch (error) {
      console.error(`Error getting provider for chain ${chainName}:`, error);
      throw error;
    }
  }

  async getNativeBalance(chainName: string, address: string): Promise<{symbol: string, balance: string}> {
    try {
      const web3 = this.getProvider(chainName);
      const balanceInUnit = await web3.eth.getBalance(address);
      const balanceInDec = web3.utils.fromWei(balanceInUnit, 'ether');
      const chainConfig = SUPPORTED_CHAINS[chainName];
      
      if (!chainConfig) {
        throw new Error(`Chain configuration not found for ${chainName}`);
      }

      return {
        symbol: chainConfig.nativeToken.symbol,
        balance: balanceInDec
      };
    } catch (error) {
      console.error(`Error fetching balance for ${chainName}:`, error);
      throw error;
    }
  }
}

export const web3Provider = new Web3Provider();