import mongoose from 'mongoose';
const TokenBalanceSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  balance: { type: String, required: true },
  valueInUSD: { type: Number, required: true }
}, {
  versionKey: false,
  _id: false
});

const NativeBalanceSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  balance: { type: String, required: true },
  valueInUSD: { type: Number, required: true }
}, {
  versionKey: false,
  _id: false
});

const ChainBalanceSchema = new mongoose.Schema({
  native: { type: NativeBalanceSchema, required: true },
  erc20Tokens: [TokenBalanceSchema]
}, {
  versionKey: false,
  _id: false
});

const WalletBalanceSchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  balances: {
    type: Map,
    of: ChainBalanceSchema
  },
  lastUpdated: { type: Date, default: Date.now }
}, {
  versionKey: false
});

export const WalletBalance = mongoose.model('WalletBalance', WalletBalanceSchema);
