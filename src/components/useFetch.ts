import { useEffect, useState } from 'preact/hooks'

export const useFetch = <T>(
  url: RequestInfo,
  options?: RequestInit | undefined
): { loading: boolean; response: T | null; error: Error | null } => {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      fetch(url, options)
        .then(response => response.json())
        .then(json => {
          setResponse(json)
          setLoading(false)
        })
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }, [])
  return { loading, response, error }
}
