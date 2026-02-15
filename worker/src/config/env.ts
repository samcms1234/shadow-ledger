import dotenv from "dotenv"
dotenv.config()

export const env = {
  redisUrl: process.env.REDIS_URL!,
  hoodiRpcUrl: process.env.ETH_HOODI_RPC_URL!,
  privateKey: process.env.PRIVATE_KEY!,
}
