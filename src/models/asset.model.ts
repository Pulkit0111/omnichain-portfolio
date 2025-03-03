import mongoose from 'mongoose';
const TokenBalanceSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  balance: { type: String, required: true },
  valueInUSD: { type: Number, required: true }
});

const NativeBalanceSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  balance: { type: String, required: true },
  valueInUSD: { type: Number, required: true }
});

const ChainBalanceSchema = new mongoose.Schema({
  native: { type: NativeBalanceSchema, required: true },
  erc20Tokens: [TokenBalanceSchema]
});

const WalletBalanceSchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  balances: {
    type: Map,
    of: ChainBalanceSchema
  }
});

export const WalletBalance = mongoose.model('WalletBalance', WalletBalanceSchema);
