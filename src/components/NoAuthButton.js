import React, { useState, useEffect} from 'react';
import { Button, Paragraph } from '@contentful/forma-36-react-components';
import ButtonWithMessage from './ButtonWithMessage';
import useCheckStatus from '../hooks/checkStatus'


const NoAuthButton =({sdk}) => {
  const {currentBuild} = useCheckStatus(true)

  useEffect(() => {
    sdk.window.startAutoResizer();
    setIsPolling(false)
  }, [sdk])


    return (
      <ButtonWithMessage
        buttonType="muted"
        isFullWidth={true}
        disabled

        message='Build &amp; Publish'
        isDate
        name={name}
        date={currentBuild.endTime}
      />
    );
}

export default NoAuthButton