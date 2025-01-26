"use client";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { createPublicClient } from "viem";
import { WagmiProvider } from "wagmi";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ToastAction } from "@/components/ui/toast";
import {
  mainnet,
  mantle,
} from "wagmi/chains";
import { createWalletClient, custom } from "viem";
import { http } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "Riddle-Quest",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [ mantle],
  transports: {
    [mantle.id]: http(
      "https://mantle-mainnet.g.alchemy.com/v2/XxWU7n2c8z5Wtte1dxeOkplsldBXm2vO"
    ),
  },
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const walletClient = createWalletClient({
  chain: mantle,
  transport: http(),
});
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://mantle-mainnet.g.alchemy.com/v2/XxWU7n2c8z5Wtte1dxeOkplsldBXm2vO"
  ),
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#111111",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
            {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
