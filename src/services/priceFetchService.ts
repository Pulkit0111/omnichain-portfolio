import axios from 'axios';
import { SUPPORTED_TOKENS } from '../config/tokens';
import { SUPPORTED_CHAINS } from '../config/chains';

const erc20TokenIds = [...new Set(SUPPORTED_TOKENS.map((token) => token.coinGeckoId))];
const nativeTokenIds = Object.values(SUPPORTED_CHAINS).map((chain) => chain.nativeToken.coinGeckoId);
const coinGeckoIds = [...erc20TokenIds, ...nativeTokenIds];

const coinGeckoApi = `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds.join(',')}&vs_currencies=usd`;   

export const getPrices = async () => {
  const response = await axios.get(coinGeckoApi);
  return response.data;
}