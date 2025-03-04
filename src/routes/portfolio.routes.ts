import { Router, RequestHandler } from 'express'
import { getPortfolio } from '../controllers/portfolio.controllers'

const portfolioRouter = Router()

portfolioRouter.get('/:walletAddress', getPortfolio as RequestHandler)

export default portfolioRouter
