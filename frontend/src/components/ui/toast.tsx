"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type ToastType = "success" | "error"

const ToastContext = createContext<any>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null)

  return (
    <ToastContext.Provider value={{ setMessage }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 bg-indigo-600 text-white rounded-lg px-4 py-2">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
