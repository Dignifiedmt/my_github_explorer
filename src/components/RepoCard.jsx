const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  Shell: '#89e051',
  Dockerfile: '#384d54',
}

export function RepoCard({ repo }) {
  const color = languageColors[repo.language] || '#8b949e'

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#0d1117] rounded-lg px-4 py-3 border border-[#21262d] transition-all hover:border-[#58a6ff]/40 hover:bg-[#161b22]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[#58a6ff] text-sm font-medium truncate">
          <i className="fa-regular fa-repo mr-1.5 text-[#8b949e]" />
          {repo.name}
        </span>
        {repo.stargazers_count > 0 && (
          <span className="text-[#8b949e] text-xs flex items-center gap-1 whitespace-nowrap">
            <i className="fa-regular fa-star" />
            {repo.stargazers_count}
          </span>
        )}
      </div>
      {repo.description && (
        <p className="text-[#8b949e] text-xs mt-1.5 line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-3 mt-2 flex-wrap">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-[#8b949e] text-xs">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            {repo.language}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="text-[#8b949e] text-xs flex items-center gap-1">
            <i className="fa-regular fa-code-fork" />
            {repo.forks}
          </span>
        )}
        {repo.license && (
          <span className="text-[#8b949e] text-xs flex items-center gap-1 truncate max-w-[100px]">
            <i className="fa-regular fa-scale-balanced" />
            {repo.license.spdx_id || repo.license.name}
          </span>
        )}
      </div>
    </a>
  )
}
