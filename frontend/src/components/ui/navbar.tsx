"use client"

import { useWallet } from "@/hooks/useWallet"
import { Button } from "./button"

export const Navbar = () => {
  const { isConnected, connect, connectors, disconnect, address } = useWallet()

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-neutral-800">
      <h1 className="text-xl font-bold">Shadow Ledger</h1>
      <div>
        {isConnected ? (
          <>
            <span className="mr-4 text-sm opacity-80">
              {address?.slice(0, 6)}…{address?.slice(-4)}
            </span>
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </>
        ) : (
          connectors.map((c) => (
            <Button
              key={c.id}
              onClick={() => connect({ connector: c })}
              className="mr-2"
            >
              Connect {c.name}
            </Button>
          ))
        )}
      </div>
    </div>
  )
}
