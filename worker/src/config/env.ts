import dotenv from "dotenv"
dotenv.config()

export const env = {
  redisUrl: process.env.REDIS_URL!,
  sepoliaRpcUrl: process.env.SEPOLIA_RPC_URL!,
  privateKey: process.env.PRIVATE_KEY!,
}
