import { useEffect, useState } from "react"
import { useToast } from "@/context/toast.context"
import { api } from "@/lib/api-client"
import { useAuthStore } from "@/store/auth.store"

export const useDocuments = () => {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
  console.log(useAuthStore.getState().token);
})

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
