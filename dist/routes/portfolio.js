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
const web3Provider_1 = require("../services/blockchain/web3Provider");
const chains_1 = require("../config/chains");
const erc20_1 = require("../services/tokens/erc20");
const portfolioRouter = (0, express_1.Router)();
portfolioRouter.get('/:walletAddress', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { walletAddress } = req.params;
        let balances = {};
        // Fetch native token balances for all supported chains
        for (const [chainName, chainConfig] of Object.entries(chains_1.SUPPORTED_CHAINS)) {
            const balance = yield web3Provider_1.web3Provider.getNativeBalance(chainName, walletAddress);
            balances[chainConfig.nativeToken.symbol] = balance;
        }
        //Fetch ERC20 Token Balances
        const erc20Balances = yield erc20_1.erc20Service.getTokenBalances(walletAddress);
        erc20Balances.forEach((balance) => {
            balances[balance.symbol] = balance.balance;
        });
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
