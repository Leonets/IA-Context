// mcp/src/utils/getTokenApy.ts
import { z } from "zod";

export const tokensMap = {
  // usdc: "usdc",
  xUsdc: "xusdc",

  // usdt: "usdt",  
  xUsdt: "xusdt",  
  // tether: "usdt",

  // xWbtc: "xWbtc",
  // xEth: "xEth",
  lsulp: "lsulp",

  // bitcoin: "bitcoin",
  // ethereum: "ethereum",
  xWbtc: "bitcoin",
  xEth: "ethereum",

  xrd: "xrd",
  radix: "xrd",

  wowo: "wowo",
  early: "early",
  hug: "hug",

  husdc: "binance-bridged-usdc-bnb-smart-chain",
  husdt: "usdt0",
  hbtc: "wrapped-bitcoin",
  heth: "weth",
} as const;


export const tokensDirection = {
  up: "up",
  down: "down"
} as const;

type StatsResponse = {
  assets: {
    [tokenKey: string]: {
      lendingAPY: number;
      borrowAPY: number;
      totalSupply: { 
        amount: number
      };
      totalBorrow: { 
        amount: number
      };      
      availableLiquidity: number;
      optimalUsage: number;
      LTVLimit: number;
    };
  };
};


export const AllowedTokens = z.enum(Object.keys(tokensMap) as [keyof typeof tokensMap]);
export const AllowedDirection = z.enum(Object.keys(tokensDirection) as [keyof typeof tokensDirection]);

export function getApyExtendedFromStats(stats: StatsResponse, tokenKey: string): { 
    supplyAPY: number; borrowAPY: number,
  totalSupply: number, totalBorrow: number, availableLiquidity: number, optimalUsage: number,
  LTVLimit: number } | null {
    
  const asset = stats.assets[tokenKey];
  if (!asset) return null;

  return {
    supplyAPY: asset.lendingAPY,
    borrowAPY: asset.borrowAPY,
    totalSupply: asset.totalSupply.amount,
    totalBorrow: asset.totalBorrow.amount,
    availableLiquidity: asset.availableLiquidity,
    optimalUsage: asset.optimalUsage,
    LTVLimit: asset.LTVLimit,
  };
}


export function getApyFromStats(stats: StatsResponse, tokenKey: string): { supplyAPY: number; borrowAPY: number } | null {
  const asset = stats.assets[tokenKey];
  if (!asset) return null;

  return {
    supplyAPY: asset.lendingAPY,
    borrowAPY: asset.borrowAPY
  };
}
