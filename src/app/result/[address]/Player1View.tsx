"use client";

import { Button } from "@/components/Button";
import Loading from "@/components/Loading";
import Result from "@/components/Result";
import { Select } from "@/components/Select";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";

const Player1View: FC = () => {
  const [move, setMove] = useState("");
  const [isLoading] = useState(false);
  const [moveRevealed] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMove(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(move);
  };

  if (isLoading) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex flex-col items-center justify-center p-4">
        <Loading msg="Waiting for player 2 to play" />
        <div className="w-44 mt-4">
          <Button type="submit">Call Timeout</Button>
        </div>
      </main>
    );
  }

  if (moveRevealed) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex flex-col items-center justify-center p-4">
        <Result won={true} />
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
              label="Choose your selected move"
              value={move}
              onChange={handleChange}
              options={[
                { value: "1", label: "Rock" },
                { value: "2", label: "Paper" },
                { value: "3", label: "Scissors" },
                { value: "4", label: "Lizard" },
                { value: "5", label: "Spock" },
              ]}
            />
          </div>

          <Button type="submit">Reveal your move</Button>
        </form>
      </div>
    </main>
  );
};

export default Player1View;
