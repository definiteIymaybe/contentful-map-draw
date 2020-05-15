import React, { useState, useEffect } from "react";
import { Button, Paragraph } from '@contentful/forma-36-react-components';
import { findPhaseDetail }from '../utils'
import ButtonWithMessage from './ButtonWithMessage'
import SiteStatus from './SiteStatus'
import BuildStatusFooter from './BuildStatusFooter'


const Filler = ({percentage, message }) => {
  return <div className="filler animated-gradient" style={{ width: `${percentage}%` }}>
    <span className="btn-content">{message}</span>
  </div>
}


const Bar = ({percentage, message}) => {
  return (
      <div className="progress-bar">
        <Filler percentage={percentage} message={message} />
      </div>
    )
}


const ProgressBar = ({
  percentage,
  setPercentage,
  progressBarMessage,
  phaseMessage,
  build

}) =>  {

// 1. Request received
// Thanks, {name}. Request received.
// 2. Prep
// Gathering data from {nickname} Contentful
// 3. Build
// Building
// 4. Quality check
// 5. Deploy

  const nextStep = () => {
    if(percentage === 100) return 
    setPercentage(percentage+20)
  }

  useEffect(() => {
    
  }, [build])

  if (percentage === 0){
    return <ButtonWithMessage
      message={progressBarMessage}
      isDate={true}
      date={build && findPhaseDetail(build, build.currentPhase, 'startTime')} />
  }
  if (percentage === 105){
    return <ButtonWithMessage
    message={progressBarMessage}
    isDate={true}
    date={build && findPhaseDetail(build, build.currentPhase, 'startTime')} />
  }
    return (
      <>
        <SiteStatus />
        <Bar percentage={percentage} message={progressBarMessage} />
        <BuildStatusFooter
        message={`${phaseMessage} at `}
        date={build && findPhaseDetail(build, build.currentPhase, 'startTime')}
        />
      </>
    )
}

const ProgressBarContainer = ({ name, currentBuild }) => {
  const [emoji, setEmoji] = useState('')
  const [progressBarMessage, setProgressBarMessage] = useState(``)
  const [phaseMessage, setPhaseMessage] = useState('')
  const [percentage, setPercentage] = useState(0)
  

  const mapCurrentPhaseToTracker = ({phase}) => {
    switch(phase){
        case "SUBMITTED":
          return [
            ``,
            `Thanks, ${name}. Request received.`,
            'AWS received your build request at',
            0
          ]
        case "QUEUED":
          return [
            '👍🏻',
            'Accepted',
            'AWS accepted your build request',
            34
          ]
        case "PROVISIONING":
          return [
            '🤖',
            'Provisioning',
            'AWS is provisioning resources',
            44
          ]
        case "DOWNLOAD_SOURCE":
          return [
            '👾',
            'Provisioning',
            'AWS is downloading source code',
            50
          ]
        case "INSTALL":
          return [
            '💾',
            'Provisioning',
            'AWS is installing source code',
            58
          ]
        case "PRE_BUILD":
          return [
            '📝',
            'Provisioning',
            'Contentful is sending updates',
            66
          ]
        case "BUILD":
          return [
            '👷👷‍♀️',
            'Building',
            'Ayzenberg is building your site',
            74
          ]
        case "POST_BUILD":
          return [
            '👍 💯',
            'Running quality checks',
            'Ayzenberg is testing your site',
            80
          ]
        case "UPLOAD_ARTIFACTS":
          return [
            '🌎',
            'Deploying',
            'AWS is syncing your changes',
            88
          ]
        case "FINALIZING":
          return [
            '🖥️📱',
            'Deploying',
            'AWS is finalizing your build',
            94
          ]
        case "COMPLETED":
          return [
            '😎',
            'Success',
            'Your build is successful',
            105
          ]
        default: 
          return [
            '😊',
            'Received',
            'AWS has received your build request',
            50
          ]
    }
  }

  useEffect(() => {
    
    if (currentBuild){
      const [emoji, progressBarMessage, phaseMessage, percentage] = mapCurrentPhaseToTracker({phase: currentBuild.currentPhase});
      setEmoji(emoji);
      setPhaseMessage(phaseMessage);
      setProgressBarMessage(progressBarMessage);
      setPercentage(percentage);
    }

  }, [currentBuild])

  return (
    <>
    <ProgressBar
      percentage={percentage}
      setPercentage={setPercentage} 
      progressBarMessage={`${progressBarMessage} ${emoji}`} 
      phaseMessage={phaseMessage}
      build={currentBuild}
    />
    </>

  )
}


export default ProgressBarContainer;
