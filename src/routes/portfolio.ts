import { Router } from 'express';
import { web3Provider } from '../services/blockchain/web3Provider';
import { SUPPORTED_CHAINS } from '../config/chains';
import { erc20Service } from '../services/tokens/erc20';
const portfolioRouter = Router();

portfolioRouter.get('/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    let balances: { [key: string]: string } = {};

    // Fetch native token balances for all supported chains
    for (const [chainName, chainConfig] of Object.entries(SUPPORTED_CHAINS)) {
      const balance = await web3Provider.getNativeBalance(chainName, walletAddress);
      balances[chainConfig.nativeToken.symbol] = balance;
    }

    //Fetch ERC20 Token Balances
    const erc20Balances = await erc20Service.getTokenBalances(walletAddress);
    erc20Balances.forEach((balance) => {
      balances[balance.symbol] = balance.balance;
    });

    res.json({
      wallet: walletAddress,
      balances
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

export default portfolioRouter;
