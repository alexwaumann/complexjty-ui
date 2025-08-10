import ThemeProvider from "@mui/system/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";

import { queryClient } from "~/config";
import { useAccountKitStore } from "~/store/accountKitStore";
import { theme } from "~/theme";

export function Providers(props: React.PropsWithChildren) {
  const { children } = props;
  const initializeAccountKit = useAccountKitStore((state) => state.initialize);

  useEffect(() => {
    const unwatch = initializeAccountKit();

    return () => {
      unwatch();
    };
  }, [initializeAccountKit]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
