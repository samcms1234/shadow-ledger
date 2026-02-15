import { prisma } from "../../backend/src/config/database"
import { registerDocumentOnChain } from "../services/blockchain.service"

type JobData = {
  documentId: string
  hash: string
}

export const processDocument = async ({ documentId, hash }: JobData) => {
  console.log("Processing job:", documentId, hash)

  try {
    // send to contract
    const txHash = await registerDocumentOnChain(hash)

    console.log("Document registered on-chain with txHash:", txHash)

    // update DB
    await prisma.document.update({
      where: { id: documentId },
      data: {
        status: "CONFIRMED",
        txHash,
      },
    })
  } catch (error) {
    console.error("Blockchain error:", error)

    // update DB status
    await prisma.document.update({
      where: { id: documentId },
      data: {
        status: "FAILED",
      },
    })
  }
}
