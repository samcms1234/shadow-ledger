import { Worker } from "bullmq"
import { redisConnection } from "../config/redis"

new Worker(
  "documentQueue",
  async (job) => {
    console.log("Processing job:", job.name)

    if (job.name === "register-document") {
      const { hash } = job.data

      // Future: Send transaction to smart contract
      console.log("Registering document hash:", hash)
    }
  },
  {
    connection: redisConnection,
  }
)
