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
const express_1 = require("express");
const web3Service_1 = require("../services/web3Service");
const chains_1 = require("../config/chains");
const erc20Service_1 = require("../services/erc20Service");
const tokens_1 = require("../config/tokens");
const portfolioRouter = (0, express_1.Router)();
portfolioRouter.get('/:walletAddress', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { walletAddress } = req.params;
        let balances = {};
        // Fetch native token and ERC20 balances for each chain
        for (const [chainName, chainConfig] of Object.entries(chains_1.SUPPORTED_CHAINS)) {
            // Get native token balance
            const nativeBalance = yield web3Service_1.web3Provider.getNativeBalance(chainName, walletAddress);
            // Initialize chain object if not exists
            if (!balances[chainName]) {
                balances[chainName] = {
                    native: {
                        symbol: chainConfig.nativeToken.symbol,
                        balance: nativeBalance
                    },
                    erc20Tokens: []
                };
            }
            // Get ERC20 balances for this chain
            const erc20Balances = yield erc20Service_1.erc20Service.getTokenBalances(chainName, walletAddress);
            const chainErc20Tokens = erc20Balances.filter((token) => tokens_1.SUPPORTED_TOKENS.some((t) => t.symbol === token.symbol && t.chainName === chainName));
            balances[chainName].erc20Tokens = chainErc20Tokens;
        }
        res.json({
            wallet: walletAddress,
            balances
        });
    }
    catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
}));
exports.default = portfolioRouter;
