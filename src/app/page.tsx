"use client";

import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useDeployRPSContract } from "@/hooks/useBlockchain";
import { useRouter } from "next/navigation";

interface FormState {
  move: string;
  player2: string;
  stake: string;
}

const Home: FC = () => {
  const [values, setValues] = useState<FormState>({
    move: "",
    player2: "",
    stake: "",
  });
  const { address } = useAccount();
  const {
    deployRPSContract,
    isDeploying,
    isDeployed,
    isTxReceiptLoading,
    contractAddress,
  } = useDeployRPSContract();

  const handleChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    deployRPSContract(values.move, values.player2, values.stake);
  };

  if (!address) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex items-center justify-center p-4">
        <ConnectButton />
      </main>
    );
  }

  return (
    <main className="h-[87vh] bg-zinc-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl border border-zinc-300">
        <h1 className="text-2xl font-semibold text-zinc-800 mb-6 text-center">
          Rock Paper Scissors Lizard Spock
        </h1>

        {isDeployed && contractAddress && (
          <SuccessfullDeployment deployedContractAddress={contractAddress} />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Select
              id="move"
              label="Choose your move"
              value={values.move}
              onChange={handleChange("move")}
              options={[
                { value: "1", label: "Rock" },
                { value: "2", label: "Paper" },
                { value: "3", label: "Scissors" },
                { value: "4", label: "Lizard" },
                { value: "5", label: "Spock" },
              ]}
              required
            />

            <Input
              id="player2"
              type="text"
              label="Your opponent's wallet address"
              placeholder="0x00..."
              value={values.player2}
              onChange={handleChange("player2")}
              required
            />

            <Input
              id="stake"
              type="number"
              label="Stake (ETH)"
              placeholder="Enter amount"
              value={values.stake}
              onChange={handleChange("stake")}
              required
            />
          </div>

          <Button loading={isDeploying || isTxReceiptLoading} type="submit">
            Create game!
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Home;

const SuccessfullDeployment = ({
  deployedContractAddress,
}: {
  deployedContractAddress: string;
}) => {
  const router = useRouter();
  return (
    <div className="bg-emerald-100 border border-emerald-200 rounded-lg p-4 mb-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-emerald-800 font-medium">
            🎮 Game deployed successfully!
          </p>
          <p className="text-emerald-600 text-sm mt-1">
            Share the game link with your opponent to start playing
          </p>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href + `player2/${deployedContractAddress}`
            );
          }}
          className="px-3 py-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-sm font-medium"
        >
          Copy Link
        </button>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() =>
            router.push(
              window.location.href + `result/${deployedContractAddress}`
            )
          }
          className="px-4 py-2 w-full bg-emerald-500 text-white rounded hover:bg-emerald-600 text-sm font-medium flex justify-center items-center gap-2"
        >
          Go to Game Room
        </button>
      </div>
    </div>
  );
};
