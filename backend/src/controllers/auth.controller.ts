import { Request, Response } from "express"
import { requestNonce, verifySiwe } from "../services/auth.service"

export const getNonce = async (req: Request, res: Response) => {
  const { wallet } = req.body

  if (!wallet) {
    return res.status(400).json({ error: "Wallet required" })
  }

  const nonce = await requestNonce(wallet)

  res.json({ nonce })
}

export const login = async (req: Request, res: Response) => {
  const { message, signature } = req.body

  if (!message || !signature) {
    return res.status(400).json({ error: "Missing SIWE payload" })
  }

  const result = await verifySiwe(message, signature)

  res.json(result)
}
