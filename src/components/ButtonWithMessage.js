import React, { useState, useEffect} from 'react';
import { Button, Paragraph } from '@contentful/forma-36-react-components';
import SiteStatus from './SiteStatus'
import BuildStatusFooter from './BuildStatusFooter'

const ButtonWithMessage = ({disabled = false, message, onClick, date, isDate, loading=false, name, buttonType = "positive"}) => {
  let nameWithComma = `, ${name}`
  return (
    <>
    <SiteStatus />
    <Button
    buttonType={buttonType}
    isFullWidth={true}
    onClick={onClick && onClick}
    disabled={disabled}
  >
    {loading? `Thanks${nameWithComma}. Request received.` : message}
  </Button>
  {date && <BuildStatusFooter message="Last built" isDate={isDate} date={date} />}
  </>
  )
}
export default ButtonWithMessage