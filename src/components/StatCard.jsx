export function StatCard({ icon, label, value }) {
  return (
    <div className="bg-[#0d1117] rounded-lg px-4 py-3 border border-[#21262d] text-center transition-colors hover:border-[#30363d]">
      <div className="text-[#8b949e] text-xs flex items-center justify-center gap-1.5">
        <i className={icon} />
        {label}
      </div>
      <div className="text-white font-semibold text-lg mt-0.5">{value}</div>
    </div>
  )
}
