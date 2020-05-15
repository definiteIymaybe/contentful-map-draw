import React from 'react';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import NoAuthButton from './components/NoAuthButton'
import AuthButton from './components/AuthButton'

export const initialize = sdk => {
  let roles = sdk.user.spaceMembership.roles.length >=1 ? sdk.user.spaceMembership.roles.map(role => role.name) :  sdk.user.spaceMembership.roles
  let userRoles = sdk.user.spaceMembership.admin ? ['admin'] : roles;
  
  if (userRoles.includes('admin') || userRoles.includes('Editor') || userRoles.includes('API User')){
    ReactDOM.render(<AuthButton sdk={sdk} />, document.getElementById('root'));
  } else {
    ReactDOM.render(<NoAuthButton sdk={sdk} />, document.getElementById('root'));
  }
};

init(initialize);
