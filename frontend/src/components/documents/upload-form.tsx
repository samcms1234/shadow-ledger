"use client"

import { useState } from "react"
import { useDocuments } from "@/hooks/useDocument"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const UploadForm = () => {
  const [hash, setHash] = useState("")
  const { submitDocument } = useDocuments()

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-semibold">Submit Document</h2>

      <Input
        placeholder="Enter document hash"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
      />

      <Button onClick={() => submitDocument(hash)}>Submit</Button>
    </div>
  )
}
