"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletBalance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TokenBalanceSchema = new mongoose_1.default.Schema({
    symbol: { type: String, required: true },
    balance: { type: String, required: true },
    valueInUSD: { type: Number, required: true }
});
const NativeBalanceSchema = new mongoose_1.default.Schema({
    symbol: { type: String, required: true },
    balance: { type: String, required: true },
    valueInUSD: { type: Number, required: true }
});
const ChainBalanceSchema = new mongoose_1.default.Schema({
    native: { type: NativeBalanceSchema, required: true },
    erc20Tokens: [TokenBalanceSchema]
});
const WalletBalanceSchema = new mongoose_1.default.Schema({
    wallet: { type: String, required: true },
    balances: {
        type: Map,
        of: ChainBalanceSchema
    }
});
exports.WalletBalance = mongoose_1.default.model('WalletBalance', WalletBalanceSchema);
