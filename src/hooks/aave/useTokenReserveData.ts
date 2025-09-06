import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";
import { queryClient } from "~/config";
import { aave } from "~/contracts/aave";

export function useTokenReserveData(address: Address) {
  const {
    data: tokenReserveData,
    isPending: isFetchingTokenReserveData,
    error: fetchTokenReserveDataError,
  } = useQuery(
    {
      queryFn: () => aave.fetchTokenReserveData(address),
      queryKey: ["useTokenReserveData", address],
      refetchInterval: 600000,
    },
    queryClient,
  );
}
