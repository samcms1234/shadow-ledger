import { Queue } from "bullmq"
import { redisConnection } from "../config/redis"

export const documentQueue = new Queue("documentQueue", {
  connection: redisConnection,
})
