import { app } from "./app"
import { env } from "./config/env"
import { prisma } from "./config/database"

const server = app.listen(env.port, () => {
  console.log(`🚀 Shadow Ledger backend running on port ${env.port}`)
})

process.on("SIGTERM", async () => {
  console.log("Shutting down...")
  await prisma.$disconnect()
  server.close(() => process.exit(0))
})
