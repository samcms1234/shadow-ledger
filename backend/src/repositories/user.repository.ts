import { prisma } from "../config/database"

export const findUserByWallet = (wallet: string) =>
  prisma.user.findUnique({ where: { wallet } })

export const createUser = (wallet: string, nonce: string) =>
  prisma.user.create({
    data: {
      wallet,
      nonce,
    },
  })

export const updateNonce = (userId: string, nonce: string) =>
  prisma.user.update({
    where: { id: userId },
    data: { nonce },
  })
