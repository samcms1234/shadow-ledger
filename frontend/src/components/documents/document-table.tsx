"use client"

import { useFetchDocuments } from "@/hooks/useFetchDocuments"

export const DocumentTable = () => {
  const { data: documents } = useFetchDocuments()

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full bg-neutral-800 rounded-lg">
        <thead>
          <tr className="text-left text-sm opacity-70">
            <th className="px-4 py-2">Hash</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Tx</th>
          </tr>
        </thead>

        <tbody>
          {documents?.map((d) => (
            <tr key={d.id} className="border-t border-neutral-700">
              <td className="px-4 py-2">{d.hash}</td>
              <td className="px-4 py-2">{d.status}</td>
              <td className="px-4 py-2">{d.txHash ?? "—"}</td>
            </tr>
          ))}

          {!documents?.length && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
