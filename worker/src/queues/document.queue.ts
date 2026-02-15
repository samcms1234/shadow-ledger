import { Worker } from "bullmq"
import { redisConnection } from "../config/redis"
import { processDocument } from "../processors/document.processor"

export const documentWorker = new Worker(
  "documentQueue",
  async (job) => {
    await processDocument(job.data)
  },
  { connection: redisConnection }
)

documentWorker.on("completed", (job) => {
  console.log(`🟢 Job ${job.id} completed`)
})

documentWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err)
})
