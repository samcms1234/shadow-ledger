import { prisma } from "../config/database"
import { documentQueue } from "../jobs/document.queue"

export const createDocument = async (
  hash: string,
  issuerId: string
) => {
  // Count existing versions of same hash
  const existingCount = await prisma.document.count({
    where: { hash },
  })

  const doc = await prisma.document.create({
    data: {
      hash,
      issuerId,
      version: existingCount + 1,
      status: "PENDING",
    },
  })

  // Send to worker for blockchain registration
  await documentQueue.add("register-document", {
    documentId: doc.id,
    hash,
  })

  return doc
}

export const markDocumentConfirmed = async (
  documentId: string,
  txHash: string
) => {
  return prisma.document.update({
    where: { id: documentId },
    data: {
      status: "CONFIRMED",
      txHash,
    },
  })
}

export const markDocumentFailed = async (
  documentId: string
) => {
  return prisma.document.update({
    where: { id: documentId },
    data: {
      status: "FAILED",
    },
  })
}
