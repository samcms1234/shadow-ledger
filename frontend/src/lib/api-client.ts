import axios from "axios"
import { useAuthStore } from "@/store/auth.store"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

// attach token before each request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token && config.headers) {
    config.headers.set("Authorization", `Bearer ${token}`)
  }

  return config
})
