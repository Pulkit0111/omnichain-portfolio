import { Router } from 'express'
import { getPortfolio } from '../controllers/portfolio.controllers'

const portfolioRouter = Router()

portfolioRouter.get('/:walletAddress', getPortfolio)

export default portfolioRouter
