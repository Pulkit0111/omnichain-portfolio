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
exports.erc20Service = exports.ERC20Service = void 0;
const web3Service_1 = require("./web3Service");
const tokens_1 = require("../config/tokens");
const ERC20_ABI = [
    {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
    }
];
class ERC20Service {
    getTokenBalance(chainName, tokenAddress, walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const web3 = web3Service_1.web3Provider.getProvider(chainName);
                const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
                const balance = yield contract.methods.balanceOf(walletAddress).call();
                return String(balance);
            }
            catch (error) {
                console.error(`Error fetching token balance:`, error);
                throw error;
            }
        });
    }
    getTokenDecimals(chainName, tokenAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const web3 = web3Service_1.web3Provider.getProvider(chainName);
                const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
                const decimals = yield contract.methods.decimals().call();
                return Number(decimals);
            }
            catch (error) {
                console.error(`Error fetching token decimals:`, error);
                throw error;
            }
        });
    }
    getTokenSymbol(chainName, tokenAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const web3 = web3Service_1.web3Provider.getProvider(chainName);
                const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
                return yield contract.methods.symbol().call();
            }
            catch (error) {
                console.error(`Error fetching token symbol:`, error);
                throw error;
            }
        });
    }
    getTokenBalances(chainName, walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const balances = yield Promise.all(tokens_1.SUPPORTED_TOKENS.filter((token) => token.chainName === chainName).map((token) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const balanceInUnit = yield this.getTokenBalance(chainName, token.address, walletAddress);
                        const decimals = yield this.getTokenDecimals(chainName, token.address);
                        const balanceInDec = web3Service_1.web3Provider.getProvider(chainName).utils.fromWei(balanceInUnit, decimals);
                        return {
                            symbol: token.symbol,
                            balance: balanceInDec,
                            coinGeckoId: token.coinGeckoId,
                            logoUrl: token.logoUrl
                        };
                    }
                    catch (error) {
                        console.error(`Error processing token ${token.symbol}:`, error);
                        // Return a zero balance for failed tokens instead of failing the entire request
                        return {
                            symbol: token.symbol,
                            balance: '0',
                            coinGeckoId: token.coinGeckoId,
                            logoUrl: token.logoUrl
                        };
                    }
                })));
                return balances;
            }
            catch (error) {
                console.error('Error fetching token balances:', error);
                throw error;
            }
        });
    }
}
exports.ERC20Service = ERC20Service;
exports.erc20Service = new ERC20Service();
