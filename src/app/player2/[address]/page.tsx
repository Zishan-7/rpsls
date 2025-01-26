"use client";

import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Input } from "@/components/Input";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import RPSABI from "@/contract/RPSABI.json";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { formatEther } from "viem";
import { usePlayer2Move } from "@/hooks/useBlockchain";
import { MOVES } from "@/utils/constants";

const Player2Move: FC = () => {
  const params = useParams();
  const address = params.address as string;
  const [move, setMove] = useState("");

  const {
    data: stake,
    isLoading: isStakeValueLoading,
    error,
  } = useReadContract({
    abi: RPSABI,
    address: address as `0x${string}`,
    functionName: "stake",
  });

  const { playMove, sendingTrasaction, isTxReceiptLoading } = usePlayer2Move();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMove(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playMove(address, move, formatEther(BigInt(String(stake))));
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  if (isStakeValueLoading) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex items-center justify-center">
        <Loading msg="Please wait..." />;
      </main>
    );
  }

  return (
    <main className="h-[87vh] bg-zinc-200 flex items-center justify-center p-4">
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
              required
              options={MOVES}
            />

            <Input
              id="stake"
              type="number"
              label="Stake (ETH)"
              placeholder="Enter amount"
              value={formatEther(BigInt(String(stake)))}
              disabled
            />
          </div>

          <Button
            loading={sendingTrasaction || isTxReceiptLoading}
            type="submit"
          >
            Submit your move
          </Button>
        </form>
      </div>
    </main>
  );
};
export default Player2Move;
