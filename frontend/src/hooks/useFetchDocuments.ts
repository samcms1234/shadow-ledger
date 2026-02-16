import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api-client"

export const useFetchDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data } = await api.get("/api/documents")
      return data
    },
  })
}
