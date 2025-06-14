import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { CacheProvider } from "@emotion/react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/system/ThemeProvider";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { theme } from "~/setup/theme";
import createCache from "@emotion/cache";
import { Header } from "~/components/Header";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Complexjty" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = createCache({
    key: "css",
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <body>
          <Providers>
            <Header />
            <Container component="main" sx={{ paddingBlock: 4 }}>
              {children}
            </Container>
          </Providers>

          <TanStackRouterDevtools position="bottom-right" />
          <Scripts />
        </body>
      </body>
    </html>
  );
}
