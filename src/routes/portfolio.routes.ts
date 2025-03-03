import { Router } from 'express'
import { web3Provider } from '../services/web3Service'
import { SUPPORTED_CHAINS } from '../config/chains'
import { erc20Service } from '../services/erc20Service'
import { SUPPORTED_TOKENS } from '../config/tokens'

const portfolioRouter = Router()

portfolioRouter.get('/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params
    let balances: { [key: string]: any } = {}

    // Fetch native token and ERC20 balances for each chain
    for (const [chainName, chainConfig] of Object.entries(SUPPORTED_CHAINS)) {
      // Get native token balance
      const nativeBalance = await web3Provider.getNativeBalance(chainName, walletAddress)
      
      // Initialize chain object if not exists
      if (!balances[chainName]) {
        balances[chainName] = {
          native: {
            symbol: chainConfig.nativeToken.symbol,
            balance: nativeBalance
          },
          erc20Tokens: []
        }
      }

      // Get ERC20 balances for this chain
      const erc20Balances = await erc20Service.getTokenBalances(chainName, walletAddress)
      const chainErc20Tokens = erc20Balances.filter((token: { symbol: string }) => 
        SUPPORTED_TOKENS.some((t: { symbol: string; chainName: string }) => 
          t.symbol === token.symbol && t.chainName === chainName
        )
      )

      balances[chainName].erc20Tokens = chainErc20Tokens
    }

    res.json({
      wallet: walletAddress,
      balances
    })
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    res.status(500).json({ error: 'Failed to fetch portfolio' })
  }
})

export default portfolioRouter
