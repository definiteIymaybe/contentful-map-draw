import React, { useState, useEffect} from 'react';
import Progress from './Progress'
import DeployButton from './DeployButton'
import useCheckStatus from '../hooks/checkStatus'

// add / update aws SDK with this

const AuthButton = ({sdk}) => {
  const [isPolling, setIsPolling] = useState(false)
  const {currentBuild} = useCheckStatus({isPolling})

  const handleSetIsPolling = (pollingBool) => {
    setIsPolling(pollingBool)
  }

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk])
  
  console.log('cool io', currentBuild)

  if ((currentBuild && currentBuild.currentPhase === 'COMPLETED') || !currentBuild){
    return <DeployButton date={currentBuild.endTime} name={sdk.user.firstName} currentBuild={currentBuild}  handleSetIsPolling={handleSetIsPolling} isPolling={isPolling} />
  } else {
    return <Progress name={sdk.user.firstName} handleSetIsPolling={handleSetIsPolling} isPolling={isPolling} currentBuild={currentBuild} />
  }
}

export default AuthButton;
