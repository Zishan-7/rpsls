"use client";

import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

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
    console.log(values);
  };

  if (!address) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex items-center justify-center p-4">
        <ConnectButton />
      </main>
    );
  }

  return (
    <main className="h-[87vh] bg-zinc-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl border border-zinc-300">
        <h1 className="text-2xl font-semibold text-zinc-800 mb-6 text-center">
          Rock Paper Scissors Lizard Spock
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Select
              id="move"
              label="Choose your move"
              value={values.move}
              onChange={handleChange("move")}
              options={[
                { value: "rock", label: "Rock" },
                { value: "paper", label: "Paper" },
                { value: "scissors", label: "Scissors" },
                { value: "lizard", label: "Lizard" },
                { value: "spock", label: "Spock" },
              ]}
            />

            <Input
              id="player2"
              type="text"
              label="Your opponent's wallet address"
              placeholder="0x00..."
              value={values.player2}
              onChange={handleChange("player2")}
            />

            <Input
              id="stake"
              type="number"
              label="Stake (ETH)"
              placeholder="Enter amount"
              value={values.stake}
              onChange={handleChange("stake")}
            />
          </div>

          <Button type="submit">Create game!</Button>
        </form>
      </div>
    </main>
  );
};

export default Home;
