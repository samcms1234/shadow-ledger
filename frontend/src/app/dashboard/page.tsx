import { UploadForm } from "@/components/documents/upload-form"
import { DocumentTable } from "@/components/documents/document-table"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <UploadForm />
      <DocumentTable />
    </div>
  )
}
