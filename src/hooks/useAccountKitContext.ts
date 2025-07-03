import { use } from "react";

import {
  AccountKitContext,
  type AccountKitContextProps,
} from "~/providers/AccountKitContext";

export function useAccountKitContext(): AccountKitContextProps {
  const context = use(AccountKitContext);

  if (!context) {
    throw new Error(
      "Cannot useAccountKitContext outside of AccountKitProvider",
    );
  }

  return context;
}
