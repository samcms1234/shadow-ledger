import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { SHADOW_LEDGER_ABI } from "@shared/blockchain/shadowLedger"
import { CONTRACT_ADDRESSES } from "@shared/blockchain/addresses"

export const useRegisterDocument = () => {
  const { data, writeContract } = useWriteContract()

  const sendTx = () => {
    writeContract({
      address: CONTRACT_ADDRESSES.hoodi,
      abi: SHADOW_LEDGER_ABI,
      functionName: "registerDocument",
      args: ["0x..."], // place your hash here
    })
  }

  const { data: receipt } = useWaitForTransactionReceipt({
    hash: data?.hash,
  })

  return { sendTx, receipt }
}
