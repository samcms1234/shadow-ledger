import { Navbar } from "@/components/ui/navbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="p-8 bg-neutral-900 min-h-screen">{children}</main>
    </div>
  )
}
