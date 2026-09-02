import { useState, useEffect, useMemo } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { useGitHubSearch } from './hooks/useGitHubSearch'
import { ProfileSkeleton } from './components/ProfileSkeleton'
import { ReposSkeleton } from './components/ReposSkeleton'
import { StatCard } from './components/StatCard'
import { RepoCard } from './components/RepoCard'

function App() {
  const [inputValue, setInputValue] = useState('')
  const debouncedUsername = useDebounce(inputValue, 400)
  const { data, loading, error, repos, reposLoading, fetchUser } = useGitHubSearch(debouncedUsername)

  useEffect(() => {
    fetchUser(debouncedUsername)
  }, [debouncedUsername, fetchUser])

  const handleInputChange = (e) => setInputValue(e.target.value)
  const handleClear = () => setInputValue('')
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      fetchUser(inputValue)
    }
  }

  const formatCount = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
    return num
  }

  const stats = useMemo(() => {
    if (!data) return null
    return {
      repos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
      following: data.following ?? 0,
      gists: data.public_gists ?? 0,
    }
  }, [data])

  const joinedDate = useMemo(() => {
    if (!data?.created_at) return null
    return new Date(data.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [data])

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          <i className="fa-brands fa-github text-[#58a6ff] mr-2" />
          GitHub Explorer
        </h1>
        <p className="text-[#8b949e] text-sm mt-1">
          Search for any GitHub user and explore their profile &amp; repositories
        </p>
      </div>

      <div className="relative mb-6">
        <div className="relative flex items-center bg-[#161b22] rounded-xl border border-[#30363d] transition-all focus-within:border-[#58a6ff] focus-within:ring-2 focus-within:ring-[#58a6ff]/30">
          <i className="fa-solid fa-magnifying-glass absolute left-4 text-[#8b949e] text-sm" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter GitHub username…"
            className="w-full bg-transparent text-white text-base pl-10 pr-20 py-3.5 outline-none rounded-xl placeholder:text-[#484f58]"
            aria-label="Search GitHub users"
          />
          {inputValue && (
            <button
              onClick={handleClear}
              className="absolute right-3 text-[#8b949e] hover:text-white transition-colors p-1.5 rounded-full hover:bg-[#21262d]"
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          )}
        </div>
        <p className="text-[#8b949e] text-xs mt-2 ml-1">
          <i className="fa-regular fa-clock mr-1" />
          Searches are debounced for performance
        </p>
      </div>

      {error && (
        <div className="bg-[#2d1b1b] border border-[#da3633]/40 text-[#f0a6a6] rounded-xl px-5 py-4 flex items-start gap-3 fade-in">
          <i className="fa-solid fa-circle-exclamation text-[#da3633] mt-0.5" />
          <div>
            <p className="font-medium">{error}</p>
            <p className="text-sm text-[#f0a6a6]/70 mt-0.5">
              Try a different username or check your internet connection.
            </p>
          </div>
        </div>
      )}

      {loading && !data && !error && <ProfileSkeleton />}

      {!loading && !data && !error && debouncedUsername && (
        <div className="text-center py-12 text-[#8b949e] fade-in">
          <i className="fa-solid fa-user-slash text-5xl mb-4 opacity-40" />
          <p className="text-lg font-medium text-white">No user found</p>
          <p className="text-sm mt-1">Try searching for a different username</p>
        </div>
      )}

      {!loading && !data && !error && !debouncedUsername && (
        <div className="text-center py-16 text-[#8b949e] fade-in">
          <i className="fa-brands fa-github-alt text-6xl mb-5 opacity-20" />
          <p className="text-lg font-medium text-white">Search for a GitHub user</p>
          <p className="text-sm mt-1">Enter a username above to get started</p>
        </div>
      )}

      {data && !loading && (
        <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-6 sm:p-8 fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={data.avatar_url}
              alt={`${data.login}'s avatar`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#30363d] object-cover flex-shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
                  {data.name || data.login}
                </h2>
                {data.type === 'Organization' && (
                  <span className="bg-[#1f2937] text-[#8b949e] text-xs px-2.5 py-0.5 rounded-full font-medium border border-[#30363d]">
                    <i className="fa-regular fa-building mr-1" />
                    Org
                  </span>
                )}
              </div>
              <a
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] text-sm hover:underline inline-flex items-center gap-1"
              >
                @{data.login}
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
              </a>
              {data.bio && (
                <p className="text-[#e6edf3] text-sm mt-2 leading-relaxed max-w-2xl">
                  {data.bio}
                </p>
              )}
              {data.location && (
                <p className="text-[#8b949e] text-xs mt-1.5 flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot" />
                  {data.location}
                </p>
              )}
              {data.company && (
                <p className="text-[#8b949e] text-xs flex items-center gap-1.5 mt-0.5">
                  <i className="fa-regular fa-building" />
                  {data.company}
                </p>
              )}
            </div>
          </div>

          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <StatCard icon="fa-regular fa-repo" label="Repos" value={formatCount(stats.repos)} />
              <StatCard icon="fa-regular fa-people" label="Followers" value={formatCount(stats.followers)} />
              <StatCard icon="fa-regular fa-people" label="Following" value={formatCount(stats.following)} />
              <StatCard icon="fa-regular fa-book" label="Gists" value={formatCount(stats.gists)} />
            </div>
          )}

          {joinedDate && (
            <p className="text-[#8b949e] text-xs mt-4 flex flex-wrap items-center gap-1.5 border-t border-[#21262d] pt-4">
              <i className="fa-regular fa-calendar" />
              Joined {joinedDate}
              {data.email && (
                <>
                  <span className="mx-1.5 opacity-30">·</span>
                  <i className="fa-regular fa-envelope" />
                  <a href={`mailto:${data.email}`} className="text-[#58a6ff] hover:underline">
                    {data.email}
                  </a>
                </>
              )}
              {data.blog && (
                <>
                  <span className="mx-1.5 opacity-30">·</span>
                  <i className="fa-regular fa-link" />
                  <a
                    href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#58a6ff] hover:underline truncate max-w-[180px] inline-block align-bottom"
                  >
                    {data.blog.replace(/^https?:\/\//, '')}
                  </a>
                </>
              )}
            </p>
          )}

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <i className="fa-regular fa-book text-[#8b949e]" />
                Popular Repositories
                <span className="text-[#8b949e] text-xs font-normal ml-1">
                  ({repos.length})
                </span>
              </h3>
              {repos.length > 0 && (
                <a
                  href={`${data.html_url}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] text-xs hover:underline"
                >
                  View all →
                </a>
              )}
            </div>

            {reposLoading && <ReposSkeleton />}

            {!reposLoading && repos.length === 0 && data && (
              <p className="text-[#8b949e] text-sm italic">No public repositories found.</p>
            )}

            {!reposLoading && repos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
