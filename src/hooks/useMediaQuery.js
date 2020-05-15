import { useState, useEffect } from 'react'

function useMediaQuery(queryInput, options = {}) {
  let query = queryInput
  query = query.replace(/^@media( ?)/m, '')

  // Uses match media feature.
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'

  const { defaultMatches = false } = {
    ...options,
  }

  const [match, setMatch] = useState(() => {
    if (supportMatchMedia) {
      return window.matchMedia(query).matches
    }
    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches
  })

  useEffect(() => {
    const queryList = window.matchMedia(query)
    setMatch(queryList.matches)

    function handleMatchesChange() {
      setMatch(queryList.matches)
    }

    queryList.addListener(handleMatchesChange)
    return () => {
      queryList.removeListener(handleMatchesChange)
    }
  }, [query, supportMatchMedia])

  if (!supportMatchMedia) {
    return undefined
  }
  return match
}

export default useMediaQuery
