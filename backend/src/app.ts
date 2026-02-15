import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import authRoutes from "./routes/auth.routes"
import documentRoutes from "./routes/document.routes"
import { errorMiddleware } from "./middlewares/error.middleware"

export const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use(helmet())
app.use(express.json({ limit: "1mb" }))
app.use(morgan("dev"))

app.get("/health", (_, res) => {
  res.json({ status: "OK" })
})

app.use("/api/auth", authRoutes)
app.use("/api/documents", documentRoutes)

app.use(errorMiddleware)
