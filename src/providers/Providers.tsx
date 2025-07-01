import ThemeProvider from "@mui/system/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import type React from "react";

import { queryClient } from "~/config";
import { theme } from "~/theme";

export function Providers(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
