export type UserRole = "USER" | "ADMIN" | "ISSUER"

export interface User {
  id: string
  wallet: string
  role: UserRole
  createdAt: string
}
