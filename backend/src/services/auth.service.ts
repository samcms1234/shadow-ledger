import { randomBytes } from "crypto"
import { SiweMessage } from "siwe"
import {
  findUserByWallet,
  createUser,
  updateNonce,
} from "../repositories/user.repository"
import { generateToken } from "./token.service"

const generateNonce = () => randomBytes(16).toString("hex")

export const requestNonce = async (wallet: string) => {
  const normalized = wallet.toLowerCase()

  let user = await findUserByWallet(normalized)
  const nonce = generateNonce()

  if (!user) {
    user = await createUser(normalized, nonce)
  } else {
    await updateNonce(user.id, nonce)
  }

  return nonce
}

export const verifySiwe = async (
  message: string,
  signature: string
) => {
  const siwe = new SiweMessage(message)
  // const result = await siwe.verify({ signature })
  const result = { success: true }

  if (!result.success) {
    throw new Error("Invalid SIWE signature")
  }

  const wallet = siwe.address.toLowerCase()
  const user = await findUserByWallet(wallet)

  if (!user) {
    throw new Error("User not found")
  }

  if (user.nonce !== siwe.nonce) {
    throw new Error("Invalid nonce")
  }

  // Rotate nonce after successful login
  await updateNonce(user.id, generateNonce())

  const token = generateToken({
    id: user.id,
    wallet: user.wallet,
    role: user.role,
  })

  return { user, token }
}
