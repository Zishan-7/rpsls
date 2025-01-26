"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Loading from "@/components/Loading";
import Result from "@/components/Result";
import { Select } from "@/components/Select";
import { useRevealMove, useWatchResult } from "@/hooks/useBlockchain";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import RPSABI from "@/contract/RPSABI.json";
import { useTimer } from "react-timer-hook";
import { MOVES } from "@/utils/constants";
import { declareWinner } from "@/utils/getWinner";

interface Player1ViewProps {
  contractAddress: string;
}

const Player1View: FC<Player1ViewProps> = ({ contractAddress }) => {
  const [move, setMove] = useState("");
  const [salt, setSalt] = useState("");
  const [player2Played, setPlayer2Played] = useState(false);
  const [showTimeoutButton, setshowTimeoutButton] = useState(false);

  const { j2Timeout } = useWatchResult(contractAddress);

  const { data: move2 } = useReadContract({
    abi: RPSABI,
    address: contractAddress as `0x${string}`,
    functionName: "c2",
    query: {
      refetchInterval: 1000,
      enabled: !player2Played,
    },
  });

  const { data: lastAction, isLoading: isLastActionLoading } = useReadContract({
    abi: RPSABI,
    address: contractAddress as `0x${string}`,
    functionName: "lastAction",
  });

  const { restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: true,
    onExpire: () => {
      setshowTimeoutButton(true);
    },
  });

  const {
    revealMove,
    sendingTrasaction,
    isTxReceiptLoading,
    transactionSuccess,
  } = useRevealMove();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    revealMove(contractAddress, move, salt);
  };

  useEffect(() => {
    if (move2) {
      setPlayer2Played(true);
    }
    if (lastAction) {
      restart(new Date(Number(lastAction) * 1000 + 5 * 60 * 1000));
    }
  }, [move2, lastAction, restart]);

  if (!move2) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex flex-col items-center justify-center p-4">
        <Loading msg="Waiting for player 2 to play" />
        <div className="w-44 mt-4">
          {!isLastActionLoading && showTimeoutButton && new Date() && (
            <Button type="submit">Call Timeout </Button>
          )}
        </div>
      </main>
    );
  }

  if (transactionSuccess) {
    const winner = declareWinner(Number(move), Number(move2));
    return (
      <main className="h-[87vh] bg-zinc-200 flex flex-col items-center justify-center p-4">
        <Result result={winner === 1 ? "won" : winner === 0 ? "tie" : "lost"} />
      </main>
    );
  }

  if (j2Timeout) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex flex-col items-center justify-center p-4">
        <Result result="lost" msg="Player 2 called timeout or " />
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
              onChange={(e) => setMove(e.target.value)}
              required
              options={MOVES}
            />
            <Input
              id="player2"
              type="text"
              label="Enter the salt you copied earlier"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            loading={sendingTrasaction || isTxReceiptLoading}
          >
            Reveal your move
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Player1View;
