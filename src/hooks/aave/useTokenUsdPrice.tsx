import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";
import { queryClient } from "~/config";
import { aave } from "~/contracts/aave";

export function useTokenUsdPrice(address: Address) {
  const {
    data: tokenUsdPrice,
    isPending: isFetchingTokenUsePrice,
    error: fetchTokenUsePriceError,
  } = useQuery(
    {
      queryFn: () => aave.fetchTokenUsdPrice(address),
      queryKey: ["useTokenUsdPrice", address],
      refetchInterval: 10000,
    },
    queryClient,
  );

  return { tokenUsdPrice, isFetchingTokenUsePrice, fetchTokenUsePriceError };
}
