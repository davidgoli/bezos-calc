import { useEffect, useState } from 'preact/hooks'

export const useFetch = (url, options) => {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(async () => {
    try {
      setResponse(await (await fetch(url, options)).json())
      setLoading(false)
    }
    catch (error) {
      setError(error)
      setLoading(false)
    }
  }, [])
  return { loading, response, error }
}

