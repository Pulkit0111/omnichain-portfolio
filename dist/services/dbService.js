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
exports.dbService = exports.DatabaseService = void 0;
const asset_model_1 = require("../models/asset.model");
class DatabaseService {
    getWalletBalance(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield asset_model_1.WalletBalance.findOne({ wallet: walletAddress }).lean();
            if (!wallet) {
                return null; // First time wallet
            }
            // Check if data is stale
            const now = new Date();
            const lastUpdated = new Date(wallet.lastUpdated);
            const isStale = now.getTime() - lastUpdated.getTime() > DatabaseService.STALE_THRESHOLD;
            // Using lean() instead of toObject() and constructing response directly from the raw document
            const result = {
                wallet: wallet.wallet,
                balances: wallet.balances,
                lastUpdated: wallet.lastUpdated,
                isStale
            };
            return result;
        });
    }
    updateWalletBalance(walletAddress, balances) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = {
                wallet: walletAddress,
                balances: balances,
                lastUpdated: new Date()
            };
            const result = yield asset_model_1.WalletBalance.findOneAndUpdate({ wallet: walletAddress }, update, { upsert: true, new: true });
        });
    }
}
exports.DatabaseService = DatabaseService;
DatabaseService.STALE_THRESHOLD = 60 * 60 * 1000; // 60 minutes in milliseconds
exports.dbService = new DatabaseService();
