import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@contentful/forma-36-react-components';

const Name = ({name}) => {

  return (
    <Paragraph>Welcome, {name}</Paragraph>
  )
}

export default Name