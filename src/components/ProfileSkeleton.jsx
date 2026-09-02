export function ProfileSkeleton() {
  return (
    <div className="space-y-5 fade-in">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full shimmer flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-5 w-40 shimmer rounded" />
          <div className="h-4 w-24 shimmer rounded" />
        </div>
      </div>
      <div className="h-4 w-full shimmer rounded" />
      <div className="h-4 w-3/4 shimmer rounded" />
      <div className="flex flex-wrap gap-3 pt-1">
        <div className="h-6 w-16 shimmer rounded-full" />
        <div className="h-6 w-20 shimmer rounded-full" />
        <div className="h-6 w-14 shimmer rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="h-12 shimmer rounded-lg" />
        <div className="h-12 shimmer rounded-lg" />
      </div>
    </div>
  )
}
