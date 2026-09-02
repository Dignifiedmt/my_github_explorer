import { useState, useCallback, useRef } from 'react'
import axios from 'axios'

export function useGitHubSearch(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [repos, setRepos] = useState([])
  const [reposLoading, setReposLoading] = useState(false)
  const controllerRef = useRef(null)

  const fetchUser = useCallback(async (user) => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    const controller = new AbortController()
    controllerRef.current = controller

    if (!user || user.trim() === '') {
      setData(null)
      setRepos([])
      setError(null)
      setLoading(false)
      setReposLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    setData(null)
    setRepos([])

    try {
      const userRes = await axios.get(
        `https://api.github.com/users/${encodeURIComponent(user.trim())}`,
        {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github.v3+json' },
        }
      )
      setData(userRes.data)

      setReposLoading(true)
      const repoRes = await axios.get(
        `https://api.github.com/users/${encodeURIComponent(user.trim())}/repos`,
        {
          signal: controller.signal,
          params: { sort: 'updated', per_page: 6 },
          headers: { Accept: 'application/vnd.github.v3+json' },
        }
      )
      const sorted = [...repoRes.data].sort((a, b) => b.stargazers_count - a.stargazers_count)
      setRepos(sorted)
      setReposLoading(false)
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
        return
      }
      if (err.response?.status === 404) {
        setError(`User "${user.trim()}" not found.`)
      } else if (err.response?.status === 403) {
        setError('API rate limit exceeded. Please try again later.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
      setData(null)
      setRepos([])
      setReposLoading(false)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, repos, reposLoading, fetchUser }
}
