"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./config";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
