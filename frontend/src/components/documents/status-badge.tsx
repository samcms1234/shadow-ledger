export const StatusBadge = ({ status }: { status: string }) => {
  const color = status === "CONFIRMED" ? "bg-green-600" : "bg-yellow-500"
  return (
    <span className={`px-3 py-1 rounded-full ${color} text-sm`}>
      {status}
    </span>
  )
}
