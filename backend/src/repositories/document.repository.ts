import { prisma } from "../config/database"

export const createDocumentRecord = (
  hash: string,
  issuerId: string
) => {
  return prisma.document.create({
    data: {
      hash,
      issuerId,
    },
  })
}

export const updateDocumentStatus = (
  id: string,
  status: string,
  txHash?: string
) => {
  return prisma.document.update({
    where: { id },
    data: {
      status,
      txHash,
    },
  })
}

export const findDocumentByHash = (hash: string) => {
  return prisma.document.findMany({
    where: { hash },
    include: { issuer: true },
  })
}
