import {
  useDeployContract,
  useReadContract,
  useTransactionReceipt,
  useWaitForTransactionReceipt,
  useWatchBlocks,
  useWriteContract,
} from "wagmi";
import RPSABI from "@/contract/RPSABI.json";
import { RPSByteCode } from "@/contract/RPSBytecode";
import { Block, decodeFunctionData, parseEther } from "viem";
import { decrypt, hashMove } from "@/utils/crytography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { declareWinner } from "@/utils/getWinner";

export const useDeployRPSContract = () => {
  const {
    deployContract,
    isPending: isDeploying,
    isSuccess: isDeployed,
    data: deployedTxHash,
  } = useDeployContract();

  const { data: txReceipt, isLoading: isTxReceiptLoading } =
    useTransactionReceipt({
      hash: deployedTxHash,
      query: {
        enabled: !!deployedTxHash,
      },
    });

  const deployRPSContract = async (move: string, j2: string, stake: string) => {
    const { hashedMove, salt } = await hashMove(Number(move));
    console.log(salt);
    deployContract({
      abi: RPSABI,
      bytecode: RPSByteCode,
      args: [hashedMove, j2],
      value: parseEther(stake),
    });
  };

  return {
    deployRPSContract,
    isDeploying,
    isDeployed,
    isTxReceiptLoading,
    deployedTxHash,
    contractAddress: txReceipt?.contractAddress,
  };
};

export const usePlayer2Move = () => {
  const router = useRouter();
  const {
    writeContract,
    isPending: sendingTrasaction,
    data,
  } = useWriteContract();

  const {
    isLoading: isTxReceiptLoading,
    isSuccess: transactionSuccess,
    data: txReceipt,
  } = useWaitForTransactionReceipt({
    hash: data,
    query: {
      enabled: !!data,
    },
  });

  const playMove = (contractAddress: string, move: string, stake: string) => {
    writeContract({
      abi: RPSABI,
      address: contractAddress as `0x${string}`,
      functionName: "play",
      args: [Number(move)],
      value: parseEther(stake),
    });
  };

  useEffect(() => {
    if (transactionSuccess) {
      router.push(`/result/${txReceipt?.to}`);
    }
  }, [transactionSuccess, router, txReceipt]);

  return {
    playMove,
    sendingTrasaction,
    transactionSuccess,
    isTxReceiptLoading,
  };
};

export const useRevealMove = () => {
  const {
    writeContract,
    isPending: sendingTrasaction,
    data,
    error,
  } = useWriteContract();

  const { isLoading: isTxReceiptLoading, isSuccess: transactionSuccess } =
    useWaitForTransactionReceipt({
      hash: data,
      query: {
        enabled: !!data,
      },
    });

  const revealMove = async (
    contractAddress: string,
    move: string,
    salt: string
  ) => {
    const decryptedSalt = await decrypt(salt);
    writeContract({
      abi: RPSABI,
      address: contractAddress as `0x${string}`,
      functionName: "solve",
      args: [Number(move), decryptedSalt],
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return {
    revealMove,
    sendingTrasaction,
    transactionSuccess,
    isTxReceiptLoading,
  };
};

export const useWatchResult = (contractAddress: string) => {
  const [j1Timeout, setJ1Timeout] = useState(false);
  const [j2Timeout, setJ2Timeout] = useState(false);
  const [winner, setWinner] = useState<number>(-1);
  const { data: player1 } = useReadContract({
    abi: RPSABI,
    address: contractAddress as `0x${string}`,
    functionName: "j1",
  });

  const { data: player2 } = useReadContract({
    abi: RPSABI,
    address: contractAddress as `0x${string}`,
    functionName: "j2",
  });

  const { data: player2Move } = useReadContract({
    abi: RPSABI,
    address: contractAddress as `0x${string}`,
    functionName: "c2",
  });

  const onBlock = (block: Block) => {
    const transactions = block.transactions;

    // eslint-disable-next-line
    transactions.forEach((transaction: any) => {
      if (transaction.from == String(player1).toLowerCase()) {
        const functionData = decodeFunctionData({
          abi: RPSABI,
          data: transaction.input,
        });

        if (functionData.functionName === "solve") {
          const player1Move = functionData.args?.[0];

          const _winner = declareWinner(
            Number(player1Move),
            Number(player2Move)
          );

          setWinner(_winner);
        }

        if (functionData.functionName === "j1Timeout") {
          setJ1Timeout(true);
        }
      }

      if (transaction.from == String(player2).toLowerCase()) {
        const functionData = decodeFunctionData({
          abi: RPSABI,
          data: transaction.input,
        });

        if (functionData.functionName === "j2Timeout") {
          setJ2Timeout(true);
        }
      }
    });
  };

  useWatchBlocks({
    includeTransactions: true,
    emitOnBegin: true,
    onBlock: onBlock,
  });

  return {
    j1Timeout,
    j2Timeout,
    winner,
  };
};
