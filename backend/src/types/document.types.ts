export type DocumentStatus = "PENDING" | "CONFIRMED" | "FAILED"

export interface Document {
  id: string
  hash: string
  version: number
  status: DocumentStatus
  txHash?: string | null
  issuerId: string
  createdAt: string
  updatedAt: string
}
