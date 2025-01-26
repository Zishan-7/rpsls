"use client";

import React, { FC } from "react";
import Player1View from "./Player1View";
import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import RPSABI from "@/contract/RPSABI.json";
import Loading from "@/components/Loading";
import Player2View from "./Player2View";

const Result: FC = () => {
  const params = useParams();
  const contractAddress = params.address as string;
  const { address: walletAddress } = useAccount();

  const { data: player1Address, isLoading: isLoadingContractData } =
    useReadContract({
      abi: RPSABI,
      address: contractAddress as `0x${string}`,
      functionName: "j1",
    });

  if (isLoadingContractData) {
    return (
      <main className="h-[87vh] bg-zinc-200 flex items-center justify-center">
        <Loading msg="Please wait..." />;
      </main>
    );
  }

  return (
    <main>
      {player1Address === walletAddress && (
        <Player1View contractAddress={contractAddress} />
      )}

      {player1Address !== walletAddress && (
        <Player2View contractAddress={contractAddress} />
      )}
    </main>
  );
};

export default Result;
