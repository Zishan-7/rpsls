import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "a9cfac5d650cc5894dd8ec808592b552",
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
