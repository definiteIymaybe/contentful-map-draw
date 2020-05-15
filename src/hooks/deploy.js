// to do
import React, {useState, useCallback, useEffect} from 'react';
import {qSP} from '../utils'
const fetchBuildStatus = async () => {
  try {
    const API = 'https://hnm853upah.execute-api.us-east-1.amazonaws.com/contentful?'+qSP+'&startBuild=false';
    const corsOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
        }
      }
   let res = await (await window.fetch(API, corsOptions)).json()
    return res;
  } catch(e){
    console.error(e)
    return [];
  }
}

const useAPIPolling = ({ initialState, fetchFunc, delay, onError, updateTrigger }) => {

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


const useDeploy= () => {
  const options = {
    fetchFunc: fetchBuildStatus,
    initialState: [],
    delay: 5000
  }
  const data = useAPIPolling(options)

  return {
    currentBuild: (data.builds && data.builds.length > 1) ? data.builds[0] : false,
    previousBuild:  (data.builds && data.builds.length > 1) ? data.builds[1] : false
  }
}
export default useDeploy
