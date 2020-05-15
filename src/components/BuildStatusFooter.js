import React from "react";
import { Paragraph } from '@contentful/forma-36-react-components';
import {findDate, findTime} from '../utils'

const BuildStatusFooter = ({
  message = 'Last built ',
  date,
  isDate = false
}) => {
  if (isDate){
    return <Paragraph id="buildStatus">{message} {findDate({date})}, {findTime({date})}</Paragraph>
  } else {
    return <Paragraph id="buildStatus">{message} {findTime({date})}</Paragraph>
  }
}
export default BuildStatusFooter;