import { useRef, useEffect } from 'react'

// a declarative useEventListener, a function taht is called whenever an event of the specified type occurs
// 1. checks if addEventListener is supported on element
// 2. adds event
// 3. removes on cleanup

const useEventListener = (eventName, initialHandler, element = global) => {
  // create a mutable ref object.
  // set .current property later, instead of initializing via passed argument in order to...
  const savedHandler = useRef()

  // update ref.current value if the handler changes.
  useEffect(() => {
    savedHandler.current = initialHandler
  }, [initialHandler]) // this allows our effect to always get the latest handler, without causing a re-run every render.

  useEffect(
    () => {
      // make sure element supports addEventListener
      const isSupported = element && element.addEventListener
      // otherwise eject
      if (!isSupported) return
      // crete the event Listener from the saved ref
      const eventListener = event => savedHandler.current(event)
      // add event listener
      element.addEventListener(eventName, eventListener)
      // remove event listener on cleanup
      // eslint-disable-next-line consistent-return
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    // re run if event name or element changes
    [eventName, element]
  )
}

export default useEventListener
