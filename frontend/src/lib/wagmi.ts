import { cookieStorage, createConfig, createStorage, http } from 'wagmi'
import { mainnet, sepolia, polygon, hoodi } from 'wagmi/chains'
import { injected, walletConnect } from "wagmi/connectors"

export function getConfig() {
  return createConfig({
    chains: [mainnet, hoodi],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [hoodi.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
