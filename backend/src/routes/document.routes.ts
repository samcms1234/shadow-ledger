import { Router } from "express"
import { registerDocument } from "../controllers/document.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

router.post("/", authMiddleware, registerDocument)

export default router
