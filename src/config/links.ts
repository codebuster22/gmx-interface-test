import { ARBITRUM, AVALANCHE, ETH_MAINNET } from "config/chains";
import { TOKENS_BY_SYMBOL_MAP } from "./tokens";

const oneInchTokensMap = {
  [ETH_MAINNET]: {
    BTC: "WBTC"
  },
  [ARBITRUM]: {
    BTC: "WBTC",
  },
  [AVALANCHE]: {
    BTC: "BTC.b",
    ETH: "WETH.e",
    WBTC: "WBTC.e",
  },
};

export function get1InchSwapUrl(chainId: number, from?: string, to?: string) {
  const rootUrl = `https://app.1inch.io/#/${chainId}/simple/swap`;
  const chainTokensMap = TOKENS_BY_SYMBOL_MAP[chainId];
  const isInvalidInput = !from || !to || !chainTokensMap[from] || !chainTokensMap[to];
  if (isInvalidInput) {
    return rootUrl;
  }
  const fromToken = oneInchTokensMap[chainId]?.[from] || from;
  const toToken = oneInchTokensMap[chainId]?.[to] || to;
  return `${rootUrl}/${fromToken}/${toToken}`;
}

export function getLeaderboardLink(chainId) {
  if (chainId === ARBITRUM) {
    return "https://www.gmx.house/arbitrum/leaderboard";
  }
  if (chainId === AVALANCHE) {
    return "https://www.gmx.house/avalanche/leaderboard";
  }
  if(chainId === ETH_MAINNET) {
    return "https://www.gmx.house/ethereum/leaderboards"
  }
  return "https://www.gmx.house";
}
