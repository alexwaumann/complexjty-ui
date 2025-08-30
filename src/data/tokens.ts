import type { Address } from "viem";

export type TokenSymbol = "ETH" | "USDC";
export type Token = {
  symbol: TokenSymbol;
  address: Address;
  decimals: number;
  logo: string;
};

export type TokenPairSymbol = "ETH/USDC";
export type TokenPair = {
  symbol: TokenPairSymbol;
  token0: Token;
  token1: Token;

  // used to match a trade to a pair w/ direction
  longKey: `${Address}${Address}`;
  shortKey: `${Address}${Address}`;
};

export const ETH_TOKEN = {
  symbol: "ETH",
  address: "0x4200000000000000000000000000000000000006",
  decimals: 18,
  logo: "/token-images/eth.png",
} as const;

export const USDC_TOKEN = {
  symbol: "USDC",
  address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
  decimals: 8,
  logo: "/token-images/usdc.png",
} as const;

export const tokenMap: Record<Address, Token> = {
  [ETH_TOKEN.address]: ETH_TOKEN,
  [USDC_TOKEN.address]: USDC_TOKEN,
};

export const tokens = Object.values(tokenMap);

export const pairs: TokenPair[] = [
  {
    symbol: "ETH/USDC",
    token0: ETH_TOKEN,
    token1: USDC_TOKEN,

    longKey: `${ETH_TOKEN.address}${USDC_TOKEN.address}`,
    shortKey: `${USDC_TOKEN.address}${ETH_TOKEN.address}`,
  },
];
