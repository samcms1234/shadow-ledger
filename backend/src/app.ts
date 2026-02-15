import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

export const app = express()

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(helmet())
app.use(express.json())
app.use(morgan("dev"))

app.get("/health", (_, res) => {
  res.json({ status: "OK" })
})
