import React, {useState, useEffect, useRef} from 'react';
import {API, corsOptions} from '../utils';


const fetchPromise = async () => {
  try {
  let res = await window.fetch(API.fetch, corsOptions)
  let data = await res.text()
  let resp = data ? JSON.parse(data) : {};
  return resp;
} catch(e){
  console.error(e)
  return [];
}
}

const fetchBuildStatus = async () => {
  try {
   let res = await fetchPromise()
    return res
  } catch(e){
    console.error(e)
    return [];
  }
}

const useOneTimeAPICall = ({ initialState, fetchFunc, onError }) => {
  const [data, setData] = useState(initialState)

  const fetchData = () => {
    return new Promise(resolve => {
      fetchFunc()
        .then(newData => {
            setData(newData)
            resolve()
        })
        .catch(e => {
          if (!onError) {
            setData(initialState)
            resolve()
          } else {
            onError(e, setData)
            resolve()
          }
        })
    })
  }

  useEffect(
    () => {
      fetchData()

    }, [])

  return data
}


const useAPIPolling = ({ initialState, fetchFunc, delay, onError}) => {

  const timerId = useRef()
  const fetchCallId = useRef(0)
  const [data, setData] = useState(initialState)

  const fetchData = (id) => {
    return new Promise(resolve => {
      fetchFunc()
        .then(newData => {
          if (id === fetchCallId.current) {
            setData(newData)
          }
          resolve()
        })
        .catch(e => {
          if (!onError) {
            setData(initialState)
            resolve()
          } else {
            onError(e, setData)
            resolve()
          }
        })
    })
  }

  const pollingRoutine = () => {
    fetchCallId.current += 1
    /* tslint:disable no-floating-promises */
    fetchData(fetchCallId.current).then(() => {
      doPolling()
    })
    /* tslint:enable no-floating-promises */
  }

  const doPolling = () => {
    timerId.current = setTimeout(() => {
      pollingRoutine()
    }, delay)
  }

  const stopPolling = () => {
    if (timerId.current) {
      clearTimeout(timerId.current)
      timerId.current = null
    }
  }

  useEffect(
    () => {
        pollingRoutine()
      return stopPolling
    }, []
  )

  return data
}


const useCheckStatus= ({isPolling = false}) => {
  const options = {
    fetchFunc: fetchBuildStatus,
    initialState: [],
    delay: 6000
  }
  const data = useAPIPolling(options)

  /**
   * polls a few times, then gets the poll obj
   */


  return {
    currentBuild: (data && data.builds && data.builds.length > 1) ? data.builds[0] : false,
  }
}
export default useCheckStatus
