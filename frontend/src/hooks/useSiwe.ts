import { useSignMessage } from "wagmi"
import { api } from "@/lib/api-client"
import { useWallet } from "./useWallet"
import { useRouter } from "next/navigation"

export const useSiwe = () => {
  const { address } = useWallet()
  const { signMessageAsync } = useSignMessage()
  const router = useRouter()

  const login = async () => {
    if (!address) return

    // Step 1 — Fetch backend nonce
    const { data } = await api.post("/api/auth/nonce", { wallet: address })

    // Step 2 — Build EIP-4361 SIWE message
    const domain = window.location.host         // domain only
    const uri = window.location.origin          // full origin
    const chainId = parseInt(window.ethereum?.chainId, 16) ?? "560048"

    const siweMessage = `${domain} wants you to sign in with your Ethereum account:
${address}

Sign in to Shadow Ledger

URI: ${uri}
Version: 1
Chain ID: ${chainId}
Nonce: ${data.nonce}
Issued At: ${new Date().toISOString()}`

    // Step 3 — Sign message in wallet
    const signature = await signMessageAsync({ message: siweMessage })

    console.log("------------------------------");
    
    console.log({ message: siweMessage, signature })

    // Step 4 — Send to backend for verification
    await api.post("/api/auth/login", { message: siweMessage, signature })

    router.refresh()
  }

  return { login }
}
