import { SUPPORTED_CHAINS } from '../config/chains'
import { web3Provider } from '../services/web3Service'
import { erc20Service } from '../services/erc20Service'
import { dbService } from '../services/dbService'
import { Request, Response } from 'express'

export const getPortfolio = async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params
      const { refresh } = req.query
      const forceRefresh = refresh === 'true'

      // Try to get from database first
      const existingData = await dbService.getWalletBalance(walletAddress)
      
      // Fetch from blockchain if:
      // 1. Data doesn't exist (first time wallet)
      // 2. Data is stale
      // 3. Force refresh is requested
      if (!existingData || existingData.isStale || forceRefresh) {
        let balances: { [key: string]: any } = {}

        // Fetch native token and ERC20 balances for each chain
        for (const [chainName, chainConfig] of Object.entries(SUPPORTED_CHAINS)) {
          // Get native token balance
          const nativeBalance = await web3Provider.getNativeBalance(chainName, walletAddress)
          
          // Initialize chain object
          balances[chainName] = {
            native: {
              symbol: chainConfig.nativeToken.symbol,
              balance: nativeBalance.balance,
              valueInUSD: nativeBalance.valueInUSD,
            },
            erc20Tokens: []
          }

          // Get ERC20 balances for this chain
          const erc20Balances = await erc20Service.getTokenBalances(chainName, walletAddress)
          balances[chainName].erc20Tokens = erc20Balances
        }

        // Create portfolio object
        const portfolio = {
          wallet: walletAddress,
          balances
        }

        // Store/Update in database
        await dbService.updateWalletBalance(walletAddress, balances)

        return res.json(portfolio)
      }

      // Return existing data if it's fresh and no force refresh
      const formattedResponse = {
        wallet: existingData.wallet,
        balances: existingData.balances
      }
      return res.json(formattedResponse)

    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolio' })
    }
  }