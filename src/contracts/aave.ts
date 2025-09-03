import { getBundlerClient } from "@account-kit/core";
import { erc20Abi, getContract, type Address } from "viem";
import { alchemyAccountsConfig } from "~/config";
import { IAaveOracle_ABI } from "~/data/abis/IAaveOracle";
import { IAaveProtocolDataProvider_ABI } from "~/data/abis/IAaveProtocolDataProvider";

type TokenReserveData = {
  address: Address;
  decimals: number;

  loanToValue: bigint;
  liquidationThreshold: bigint;
  liquidationPenalty: bigint;
  liquidityRate: bigint;
  borrowRate: bigint;

  totalSupply: bigint;
  totalDebt: bigint;
  availableLiquidity: bigint;

  supplyCap: bigint;
  borrowCap: bigint;

  isActive: boolean;
  isFrozen: boolean;
  isPaused: boolean;
  isUsageAsCollateralEnabled: boolean;
  isBorrowingEnabled: boolean;
  isSiloedBorrowing: boolean;
  isFlashLoanEnabled: boolean;
};

class AaveContract {
  private _client = getBundlerClient(alchemyAccountsConfig);

  private oracleContract = getContract({
    abi: IAaveOracle_ABI,
    address: "0xeb0a051be10228213BAEb449db63719d6742F7c4",
    client: this._client,
  });

  private _dataProviderContract = getContract({
    abi: IAaveProtocolDataProvider_ABI,
    address: "0x501B4c19dd9C2e06E94dA7b6D5Ed4ddA013EC741",
    client: this._client,
  });

  constructor() {}

  async fetchTokenReserveData(address: Address): Promise<TokenReserveData> {
    const [
      configData,
      reserveData,
      [borrowCap, supplyCap],
      isPaused,
      isSiloedBorrowing,
      isFlashLoanEnabled,
      [aTokenAddress],
    ] = await Promise.all([
      this._dataProviderContract.read.getReserveConfigurationData([address]),
      this._dataProviderContract.read.getReserveData([address]),
      this._dataProviderContract.read.getReserveCaps([address]),
      this._dataProviderContract.read.getPaused([address]),
      this._dataProviderContract.read.getSiloedBorrowing([address]),
      this._dataProviderContract.read.getFlashLoanEnabled([address]),
      this._dataProviderContract.read.getReserveTokensAddresses([address]),
    ]);

    const availableLiquidity = await getContract({
      abi: erc20Abi,
      address,
      client: this._client,
    }).read.balanceOf([aTokenAddress]);

    const [
      decimals,
      loanToValue,
      liquidationThreshold,
      liquidationPenalty,
      _,
      isUsageAsCollateralEnabled,
      isBorrowingEnabled,
      isActive,
      isFrozen,
    ] = configData;

    const [
      _0,
      _1,
      _2,
      totalStableDebt,
      totalVariableDebt,
      liquidityRate,
      borrowRate,
      _3,
      _4,
      _5,
      _6,
      _7,
    ] = reserveData;

    return {
      address,
      decimals: parseInt(decimals.toString()),

      loanToValue,
      liquidationThreshold,
      liquidationPenalty,
      liquidityRate,
      borrowRate,

      totalSupply: availableLiquidity + totalStableDebt + totalVariableDebt,
      totalDebt: totalStableDebt + totalVariableDebt,
      availableLiquidity,

      supplyCap,
      borrowCap,

      isActive,
      isFrozen,
      isPaused,
      isUsageAsCollateralEnabled,
      isBorrowingEnabled,
      isSiloedBorrowing,
      isFlashLoanEnabled,
    };
  }
}

export const aave = new AaveContract();
