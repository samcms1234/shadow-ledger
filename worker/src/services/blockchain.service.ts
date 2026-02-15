import { createWalletClient, createPublicClient, http } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { hoodi } from "viem/chains"
import { SHADOW_LEDGER_ABI } from "../blockchain/shadowLedger"
import { CONTRACT_ADDRESSES } from "../blockchain/addresses"
import { env } from "../config/env"

// --- Public client (for read + waiting)
const publicClient = createPublicClient({
  chain: hoodi,
  transport: http(env.hoodiRpcUrl),
})

// --- Wallet client (signer)
const walletClient = createWalletClient({
  chain: hoodi,
  transport: http(env.hoodiRpcUrl),
  account: privateKeyToAccount(`0x${env.privateKey}`),
})

// Register document on-chain
export const registerDocumentOnChain = async (hash: string) => {
  // 1) Send transaction
  const { request } = await publicClient.simulateContract({
    address: CONTRACT_ADDRESSES.hoodi,
    abi: SHADOW_LEDGER_ABI,
    functionName: "registerDocument",
    args: [hash],
    account: privateKeyToAccount(`0x${env.privateKey}`),
  })

  const tx = await walletClient.writeContract(request)

  console.log("📡 Sent tx:", tx)

  // 2) Wait for confirmation
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: tx,
  })

  console.log("⛓️ Tx confirmed:", receipt.transactionHash)

  return receipt.transactionHash
}
