import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { FC, PropsWithChildren } from "react";
import { useAccount } from "wagmi";

const ConnectedWalletCheck: FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();

  if (!address) {
    return (
      <main className="h-[87vh] flex items-center justify-center p-4">
        <ConnectButton />
      </main>
    );
  }

  return <>{children}</>;
};

export default ConnectedWalletCheck;
