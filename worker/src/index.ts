import { documentWorker } from "./queues/document.queue"
import { env } from "./config/env"

console.log("🕶️ Shadow Ledger Worker started")
console.log("Redis:", env.redisUrl)
console.log("RPC URL:", env.hoodiRpcUrl)
