import type { Address } from "viem";
import { ETH_TOKEN, USDC_TOKEN, type Token } from "./tokens";

// key is {0xcollateralToken0xdebtToken}
export type TokenPairKey = `${Address}${Address}`;
export type TokenPairSymbol = "ETH/USDC";
export type TokenPairDirection = "LONG" | "SHORT";

export type TokenPair = {
  symbol: TokenPairSymbol;
  token0: Token;
  token1: Token;
  direction: TokenPairDirection;
};

export const tokenPairMap: Record<TokenPairKey, TokenPair> = {
  [`${ETH_TOKEN.address}${USDC_TOKEN.address}`]: {
    symbol: "ETH/USDC",
    token0: ETH_TOKEN,
    token1: USDC_TOKEN,
    direction: "LONG",
  } as const,
  [`${USDC_TOKEN.address}${ETH_TOKEN.address}`]: {
    symbol: "ETH/USDC",
    token0: ETH_TOKEN,
    token1: USDC_TOKEN,
    direction: "SHORT",
  } as const,
};

export const tokenPairs: TokenPair[] = Object.values(tokenPairMap);
