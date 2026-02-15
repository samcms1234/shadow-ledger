import { verifyToken } from "../services/token.service"

export const authMiddleware = (req: any, res: any, next: any) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const token = header.split(" ")[1]
    const decoded = verifyToken(token)

    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: "Invalid token" })
  }
}
