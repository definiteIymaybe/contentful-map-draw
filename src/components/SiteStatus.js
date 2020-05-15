import React, { useState, useEffect} from 'react';
import { Button, Paragraph } from '@contentful/forma-36-react-components';
import { baseUrl } from '../utils'

const SiteStatus = ({}) => {
  return (
    <div className="current-status">
            <Paragraph id="tag">Current</Paragraph>
            <Paragraph id="buildLink">
              <a
                href={baseUrl}
                target='_blank'
                rel='noopener noreferrer'
                id="buildLink"
              >
                LIVE
                </a>
                </Paragraph>
          </div>
  )
}

export default SiteStatus;