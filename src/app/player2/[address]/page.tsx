"use client";

import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Input } from "@/components/Input";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";

const Player2Move: FC = () => {
  const [move, setMove] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMove(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(move);
  };

  return (
    <main className="min-h-screen bg-zinc-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl border border-zinc-300">
        <h1 className="text-2xl font-semibold text-zinc-800 mb-6 text-center">
          Rock Paper Scissors Lizard Spock
        </h1>

        <h2 className="text-xl font-semibold text-zinc-700 mb-4">
          Player 2 turn
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Select
              id="move"
              label="Choose your move"
              value={move}
              onChange={handleChange}
              options={[
                { value: "rock", label: "Rock" },
                { value: "paper", label: "Paper" },
                { value: "scissors", label: "Scissors" },
                { value: "lizard", label: "Lizard" },
                { value: "spock", label: "Spock" },
              ]}
            />

            <Input
              id="stake"
              type="number"
              label="Stake (ETH)"
              placeholder="Enter amount"
              value={"0.11"}
              disabled
            />
          </div>

          <Button type="submit">Submit your move</Button>
        </form>
      </div>
    </main>
  );
};
export default Player2Move;
