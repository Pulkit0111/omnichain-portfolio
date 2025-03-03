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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Provider = void 0;
const web3_1 = __importDefault(require("web3"));
const chains_1 = require("../../config/chains");
const price_1 = require("../portfolio/price");
class Web3Provider {
    constructor() {
        this.providers = {};
        // Initialize Web3 instances for each chain
        Object.entries(chains_1.SUPPORTED_CHAINS).forEach(([chainName, chainConfig]) => {
            this.providers[chainName] = new web3_1.default(new web3_1.default.providers.HttpProvider(chainConfig.rpcUrl));
        });
    }
    getProvider(chainName) {
        const provider = this.providers[chainName];
        if (!provider) {
            throw new Error(`No provider found for chain: ${chainName}`);
        }
        return provider;
    }
    getNativeBalance(chainName, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const prices = yield (0, price_1.getPrices)();
            try {
                const web3 = this.getProvider(chainName);
                const balanceInUnit = yield web3.eth.getBalance(address);
                const balanceInDec = web3.utils.fromWei(balanceInUnit, 'ether');
                const chainConfig = chains_1.SUPPORTED_CHAINS[chainName];
                const nativeValueInUSD = Number(balanceInDec) * prices[chainConfig.nativeToken.coinGeckoId].usd;
                return {
                    balance: balanceInDec,
                    valueInUSD: nativeValueInUSD
                };
            }
            catch (error) {
                console.error(`Error fetching balance for ${chainName}:`, error);
                throw error;
            }
        });
    }
}
exports.web3Provider = new Web3Provider();
