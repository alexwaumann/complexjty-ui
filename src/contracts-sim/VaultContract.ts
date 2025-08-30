import type { Address } from "viem";

class NotAllowedError extends Error {
  constructor() {
    super("Action not allowed");
    this.name = "NotAllowedError";
    Object.setPrototypeOf(this, NotAllowedError.prototype);
  }
}

class NoActivePositionError extends Error {
  constructor() {
    super("Vault has no active position");
    this.name = "NoActivePositionError";
    Object.setPrototypeOf(this, NoActivePositionError.prototype);
  }
}

type PositionSnapshot = {
  fundingToken: Address;
  fundingAmount: number;
  fundingAmountUsd: number;

  collateralToken: Address;
  collateralAmount: number;
  collateralAmountUsd: number;

  debtToken: Address;
  debtAmount: number;
  debtAmountUsd: number;
};

// TODO: may need to be adjusted to include the actual trade routes to use
type OpenInfo = {
  tradeType: "market" | "limit";
  limitPrice: number | undefined;

  fundingToken: Address;
  fundingAmount: number;

  collateralToken: Address;
  debtToken: Address;

  maxSlippage: number;
  targetLeverageMultiplier: number;
};

class VaultContract {
  private _owner: Address;

  private _limitOpenInfo: OpenInfo | undefined;
  private _initialPositionSnapshot: PositionSnapshot | undefined;

  private _takeProfitPrice: number | undefined;
  private _stopLossPrice: number | undefined;

  constructor(owner: Address) {
    this._owner = owner;
  }

  // ACCESSOR METHODS
  get positionSnapshot() {
    // TODO: we need to create a snapshot that includes currentPosition snapshot (from AAVE) + takeProfit/stopLoss/liquidationProtection/etc
    return {};
  }

  get initialPositionSnapshot(): PositionSnapshot | undefined {
    return this._initialPositionSnapshot;
  }

  get takeProfitPrice(): number | undefined {
    return this._takeProfitPrice;
  }

  get stopLossPrice(): number | undefined {
    return this._stopLossPrice;
  }

  get liquidationProtectionPrice(): number {
    if (!this._initialPositionSnapshot) {
      throw new NoActivePositionError();
    }

    // TODO: calculate current liquidationProtectionPrice (needs to read info from AAVE)
    return 0;
  }

  // PUBLIC METHODS
  // TODO: add try/catch here
  openPosition(sender: Address, openInfo: OpenInfo): boolean {
    try {
      if (!this.isOwner(sender)) {
        throw new NotAllowedError();
      }

      return this._open(openInfo);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  closePosition(sender: Address): boolean {
    try {
      if (!this.isOwner(sender)) {
        throw new NotAllowedError();
      }

      return this._close();
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  triggerLimitOpen(): boolean {
    // TODO: check if it should actually trigger
    try {
      if (!this._limitOpenInfo) {
        throw new NotAllowedError();
      }

      // TODO: we may need to change how we handle opening
      return this._open(this._limitOpenInfo);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  triggerTakeProfit(): boolean {
    // TODO: check if it should actually trigger
    try {
      if (!this._takeProfitPrice) {
        throw new NotAllowedError();
      }

      return this._close();
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  triggerStopLoss() {
    try {
      // TODO: check if it should actually trigger
      if (!this._stopLossPrice) {
        throw new NotAllowedError();
      }

      return this._close();
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * @description Protects the position from AAVE liquidation by closing it before AAVE can liquidate the position.
   */
  triggerLiquidationProtection(): boolean {
    try {
      // TODO: check if it should actually trigger
      return this._close();
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // PRIVATE METHODS
  private _open(openInfo: OpenInfo): boolean {
    if (this._initialPositionSnapshot) {
      return false;
    }

    // TODO: simulate opening the position here
    return false;
  }

  private _close(): boolean {
    if (!this._initialPositionSnapshot) {
      return false;
    }

    // TODO: simiulate closing the position here
    return false;
  }

  // UTILITY METHODS
  private isOwner(address: Address) {
    return this._owner === address;
  }

  private reset() {
    this._limitOpenInfo = undefined;
    this._initialPositionSnapshot = undefined;

    this._takeProfitPrice = undefined;
    this._stopLossPrice = undefined;
  }
}
