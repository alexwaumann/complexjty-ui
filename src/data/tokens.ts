import { getBundlerClient } from "@account-kit/core";
import {
  erc20Abi,
  getContract,
  type Address,
  type GetContractReturnType,
} from "viem";
import type { BundlerClient } from "viem/account-abstraction";
import { alchemyAccountsConfig } from "~/config";

export type TokenSymbol = "ETH" | "USDC";
export class Token {
  public readonly name: string;
  public readonly symbol: TokenSymbol;
  public readonly address: Address;
  public readonly decimals: number;
  public readonly logo: string;
  public readonly contract: GetContractReturnType<
    typeof erc20Abi,
    BundlerClient,
    Address
  >;

  constructor(
    name: string,
    symbol: TokenSymbol,
    address: Address,
    decimals: number,
  ) {
    this.name = name;
    this.symbol = symbol;
    this.address = address;
    this.decimals = decimals;
    this.logo = `/token-images/${symbol.toLowerCase()}.png`;
    // todo: we may need to watchBundlerClient and update this contract accordingly
    this.contract = getContract({
      abi: erc20Abi,
      address,
      client: getBundlerClient(alchemyAccountsConfig),
    });
  }
}

export const ETH_TOKEN = new Token(
  "Ether",
  "ETH",
  "0x4200000000000000000000000000000000000006",
  18,
);

export const USDC_TOKEN = new Token(
  "USD Coin",
  "USDC",
  "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
  6,
);

export const tokenMap: Record<Address, Token> = {
  [ETH_TOKEN.address]: ETH_TOKEN,
  [USDC_TOKEN.address]: USDC_TOKEN,
};

export const tokens = Object.values(tokenMap);
