import { Button } from "@/components/Button";
import Loading from "@/components/Loading";
import Result from "@/components/Result";
import React, { FC, useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import RPSABI from "@/contract/RPSABI.json";
import { formatEther } from "viem";
import { useTimer } from "react-timer-hook";

interface Player2ViewProps {
  contractAddress: string;
}

const Player2View: FC<Player2ViewProps> = ({ contractAddress }) => {
  const [resultDeclared, setresultDeclared] = useState(false);
  const [showTimeoutButton, setshowTimeoutButton] = useState(false);

  const { data: stake } = useReadContract({
    abi: RPSABI,
    address: contractAddress as `0x${string}`,
    functionName: "stake",
    query: {
      refetchInterval: 1000,
      enabled: !resultDeclared,
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

  useEffect(() => {
    if (stake && Number(formatEther(BigInt(String(stake)))) === 0) {
      setresultDeclared(true);
    }

    if (lastAction) {
      restart(new Date(Number(lastAction) * 1000 + 5 * 60 * 1000));
    }
  }, [stake, lastAction, restart]);

  if (!resultDeclared) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex flex-col items-center justify-center p-4">
        <Loading msg="Waiting for player 1 reveal their move" />
        <div className="w-44 mt-4">
          {!isLastActionLoading && showTimeoutButton && new Date() && (
            <Button type="submit">Call Timeout </Button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="h-[87vh] bg-zinc-200 flex flex-col items-center justify-center p-4">
      <Result won={false} />
    </main>
  );
};

export default Player2View;
