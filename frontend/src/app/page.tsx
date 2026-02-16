"use client"

import Link from "next/link"
import { useWallet } from "@/hooks/useWallet"
import { useSiwe } from "@/hooks/useSiwe"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const { address, isConnected, connect, connectors } = useWallet()
  const { login } = useSiwe()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white px-6">
      <h1 className="text-6xl font-extrabold leading-tight text-center mb-4">
        🕶️ Shadow Ledger
      </h1>
      <p className="text-lg opacity-80 text-center max-w-2xl mb-8">
        Create tamper-proof on-chain document verification — secure, decentralized,
        and simple. Connect your wallet to start submitting hashes and view their
        verification status live.
      </p>

      {!isConnected ? (
        <div className="flex flex-col items-center gap-4">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="w-48"
            >
              Connect {connector.name}
            </Button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm opacity-80">
            Connected: {address?.slice(0, 6)}…{address?.slice(-4)}
          </p>

          <Button onClick={login} className="w-48">
            Sign In with Ethereum
          </Button>

          {/** Navigate to dashboard after login */}
          <Link href="/dashboard">
            <Button className="w-48 bg-indigo-600 hover:bg-indigo-700">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="bg-neutral-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">📜 Submit Documents</h2>
          <p className="text-sm opacity-80">
            Enter the document hash and securely persist it on-chain with instant
            verification.
          </p>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">⛓️ On-Chain Security</h2>
          <p className="text-sm opacity-80">
            Leveraging decentralized blockchain ensures fraud-proof validation of
            critical information.
          </p>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">📊 Track Status</h2>
          <p className="text-sm opacity-80">
            Real-time status tracking of your document submissions with live
            contract receipts.
          </p>
        </div>
      </div>
    </div>
  )
}
