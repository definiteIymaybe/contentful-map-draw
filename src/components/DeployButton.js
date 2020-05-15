import React, { useState } from 'react';
import ButtonWithMessage from './ButtonWithMessage'
import {API, corsOptions} from '../utils'


const DeployButton = ({ date, name }) => {
  const [loading, setLoading] = useState(false)
  const deploy = () => {
    window.fetch(API.deploy, corsOptions)
    setLoading(true)
  }

  return (
    <ButtonWithMessage
      message='Build &amp; Publish'
      onClick={() => deploy()}
      isDate
      loading={loading}
      name={name}
      date={date}
    />
  )
}
export default DeployButton