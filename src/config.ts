import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { sepolia } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const sepoliaRpc = process.env.NEXT_PUBLIC_SEPOLIA_RPC;

if (!projectId) throw new Error("Project ID is not defined");

export const config = getDefaultConfig({
  appName: "Rock paper scissors lizard spock",
  projectId: projectId,
  chains: [sepolia],
  ssr: true,
  transports: {
    [sepolia.id]: http(sepoliaRpc),
  },
});
