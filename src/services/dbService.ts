import { WalletBalance } from '../models/asset.model';

export class DatabaseService {
  private static STALE_THRESHOLD = 60 * 60 * 1000; // 30 minutes in milliseconds

  async getWalletBalance(walletAddress: string): Promise<any | null> {
    const wallet = await WalletBalance.findOne({ wallet: walletAddress }).lean();
    
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
  }

  async updateWalletBalance(walletAddress: string, balances: any): Promise<void> {
    const update = {
      wallet: walletAddress,
      balances: balances,
      lastUpdated: new Date()
    };

    const result = await WalletBalance.findOneAndUpdate(
      { wallet: walletAddress },
      update,
      { upsert: true, new: true }
    );
  }
}

export const dbService = new DatabaseService();