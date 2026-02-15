import { Request, Response } from "express"
import { createDocument } from "../services/document.service"

export const registerDocument = async (req: any, res: Response) => {
  const { hash } = req.body

  if (!hash) {
    return res.status(400).json({
      success: false,
      error: "Hash is required",
    })
  }

  const document = await createDocument(hash, req.user.id)

  res.status(201).json({
    success: true,
    data: document,
  })
}
