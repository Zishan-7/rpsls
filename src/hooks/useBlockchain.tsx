import {
  useDeployContract,
  useTransactionReceipt,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import RPSABI from "@/contract/RPSABI.json";
import { RPSByteCode } from "@/contract/RPSBytecode";
import { parseEther } from "viem";
import { decrypt, hashMove } from "@/utils/crytography";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    if (transactionSuccess) {
      console.log(txReceipt);
    }
    if (error) {
      console.log(error);
    }
  }, [error, transactionSuccess, txReceipt]);

  return {
    revealMove,
    sendingTrasaction,
    transactionSuccess,
    isTxReceiptLoading,
  };
};
