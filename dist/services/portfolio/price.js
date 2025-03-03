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
exports.getPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const tokens_1 = require("../../config/tokens");
const chains_1 = require("../../config/chains");
const erc20TokenIds = [...new Set(tokens_1.SUPPORTED_TOKENS.map((token) => token.coinGeckoId))];
const nativeTokenIds = Object.values(chains_1.SUPPORTED_CHAINS).map((chain) => chain.nativeToken.coinGeckoId);
const coinGeckoIds = [...erc20TokenIds, ...nativeTokenIds];
const coinGeckoApi = `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds.join(',')}&vs_currencies=usd`;
const getPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(coinGeckoApi);
    return response.data;
});
exports.getPrices = getPrices;
