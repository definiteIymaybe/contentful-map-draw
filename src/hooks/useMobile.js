import { useState, useEffect, useLayoutEffect } from 'react'
import useMediaQuery from './useMediaQuery'

const useMobile = maxWidth => {
  // const [isMobile, setIsMobile] = useMobileState(false) // initate as false;
  const isMobileLayout = useMediaQuery(
    `${maxWidth ? `(max-width: ${maxWidth})` : `(max-width: 52em)`}`
  )

  return [isMobileLayout]
}

export default useMobile
