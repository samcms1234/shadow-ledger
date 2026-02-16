import { useState } from "react"
import { useToast } from "@/context/toast.context"
import { api } from "@/lib/api-client"

export const useDocuments = () => {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const submitDocument = async (hash: string) => {
    try {
      setLoading(true)

      await api.post("/api/documents", { hash })

      showToast("Document submitted! Waiting for block confirmation…")
    } catch (error) {
      showToast("Error submitting document", "error")
    } finally {
      setLoading(false)
    }
  }

  return { submitDocument, loading }
}
