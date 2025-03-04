"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolio = void 0;
const chains_1 = require("../config/chains");
const web3Service_1 = require("../services/web3Service");
const erc20Service_1 = require("../services/erc20Service");
const dbService_1 = require("../services/dbService");
const priceFetchService_1 = require("../services/priceFetchService");
const getPortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { walletAddress } = req.params;
        const { refresh } = req.query;
        const forceRefresh = refresh === 'true';
        // Try to get from database first
        const existingData = yield dbService_1.dbService.getWalletBalance(walletAddress);
        // Fetch from blockchain if:
        // 1. Data doesn't exist (first time wallet)
        // 2. Data is stale
        // 3. Force refresh is requested
        if (!existingData || existingData.isStale || forceRefresh) {
            const prices = yield (0, priceFetchService_1.getPrices)(); //get prices for all tokens
            let balances = {};
            // Fetch native token and ERC20 balances for each chain
            for (const [chainName, chainConfig] of Object.entries(chains_1.SUPPORTED_CHAINS)) {
                // Get native token balance
                const nativeBalance = yield web3Service_1.web3Provider.getNativeBalance(chainName, walletAddress);
                // Initialize chain object
                balances[chainName] = {
                    native: {
                        symbol: chainConfig.nativeToken.symbol,
                        balance: nativeBalance.balance,
                        valueInUSD: Number(nativeBalance.balance) * prices[chainConfig.nativeToken.coinGeckoId].usd
                    },
                    erc20Tokens: []
                };
                // Get ERC20 balances for this chain
                const erc20Balances = yield erc20Service_1.erc20Service.getTokenBalances(chainName, walletAddress);
                const erc20BalancesWithValues = erc20Balances.map((balance) => ({
                    symbol: balance.symbol,
                    balance: balance.balance,
                    valueInUSD: Number(balance.balance) * prices[balance.coinGeckoId].usd
                }));
                balances[chainName].erc20Tokens = erc20BalancesWithValues;
            }
            // Create portfolio object
            const portfolio = {
                wallet: walletAddress,
                balances
            };
            // Store/Update in database
            yield dbService_1.dbService.updateWalletBalance(walletAddress, balances);
            return res.json(portfolio);
        }
        // Return existing data if it's fresh and no force refresh
        const formattedResponse = {
            wallet: existingData.wallet,
            balances: existingData.balances
        };
        return res.json(formattedResponse);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});
exports.getPortfolio = getPortfolio;
