export function ReposSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-16 shimmer rounded-lg" />
      ))}
    </div>
  )
}
