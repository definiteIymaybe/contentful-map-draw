import { useState, useEffect, useRef } from 'react'
import useEventListener from './useEventListener'

/**
 * a factory to:
 * create custom global useState hooks on a per prop basis,
 * that persist through page refresh, across tabs, windows, and your dreams.
 *
 * ie
 *
 * import { useState } from 'react';
 * const [platform, setPlatform] = useState('facebook')
 *
 * becomes
 *
 * import createGlobalPersistedStateHook from '../hooks/custom/createGlobalPersistedStateHook'
 * const usePlatformState = createGlobalPersistedStateHook('platform'); // run it through the willy wonka
 *
 * const [platform, setPlatform] = usePlatformState('facebook')
 *
 * input - storage key, optional storage provider (default = localStorage)
 * output - a hook that you can use as a direct replacement for useState.
 *
 * A factory function is any function which is not a class or constructor that returns a (presumably new) object
 */

// instantiate a global state object
const globalState = {}

// thisCallback is function passed in
// HO function
// callback function si being passed in
const createGlobalState = (key, thisCallback, initialValue) => {
  // if the key in global state does not exist
  // define the value in global state
  // including relevant callbacks
  if (!globalState[key]) {
    globalState[key] = { callbacks: [], value: initialValue }
  }
  globalState[key].callbacks.push(thisCallback)
  // add the callback to this callback
  return {
    deregister() {
      const arr = globalState[key].callbacks
      const index = arr.indexOf(thisCallback)
      // if the array does not contain this callback, add
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
    emit(value) {
      if (globalState[key].value !== value) {
        globalState[key].value = value
        globalState[key].callbacks.forEach(callback => {
          if (thisCallback !== callback) {
            callback(value)
          }
        })
      }
    },
  }
}

// createStorage object with get, set methods
// provider default is localStorage
const createStorage = provider => ({
  // get method
  get(key, defaultValue) {
    // get item from provider
    const json = provider.getItem(key)
    // if the item is not in the storage
    // return default value
    // allow value to be a function if function so we have same API as useState
    // or value
    // if item is in storage
    // parse json
    // eslint-disable-next-line no-nested-ternary
    return json === null
      ? typeof defaultValue === 'function'
        ? defaultValue()
        : defaultValue
      : JSON.parse(json)
  },
  // set method
  set(key, value) {
    provider.setItem(key, JSON.stringify(value))
  },
})

const usePersistedState = (initialState, key, { get, set }) => {
  const persistedGlobalState = useRef(null)
  // set initialValue for state through our storage methods
  const [state, setState] = useState(() => get(key, initialState))

  // subscribe to changes in storage
  useEventListener('storage', ({ key: k, newValue }) => {
    const newState = JSON.parse(newValue)

    if (k === key && state !== newState) {
      setState(newState)
    }
  })

  // only run on mount by passing in [] as second argument
  useEffect(() => {
    // register a lsitener that calls setSTate when another instance emits
    persistedGlobalState.current = createGlobalState(
      key,
      setState,
      initialState
    )
    return () => {
      persistedGlobalState.current.deregister()
    }
  }, [])

  // only persist to storage if state changes []
  useEffect(() => {
    // persist to localStorage
    set(key, state)
    // inform all other instances in this stab
    persistedGlobalState.current.emit(state)
  }, [state])
  return [state, setState]
}

/**
 * key - string, boolean, function, object, array
 * provider - optional, defaults to localStorage
 *
 * creates an instance of storage, defaults to localStorage
 * returns perisistedState values as initial based off key from storage location
 * returns useState
 *
 * gets the initial state
 */

// create a storage placeholder for the key
// userPersistedState
// return usestate
const createGlobalPersistedState = (key, provider = global.localStorage) => {
  if (provider) {
    const storage = createStorage(provider)
    return initialState => usePersistedState(initialState, key, storage)
  }
  return useState
}

export default createGlobalPersistedState
