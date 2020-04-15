import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { Scratchpad, Icon, Spinner } from 'components/common';
import { ScratchpadProvider } from 'providers/ScratchpadProvider';
import Navigation from 'components/navigation/Navigation';
import CurrentUserProvider from 'contexts/CurrentUserProvider';
import CurrentUserContext from 'contexts/CurrentUserContext';
import AppErrorBoundary from './AppErrorBoundary';

import 'stylesheets/typeahead.less';

const ScrollToHint = styled.div(({ theme }) => css`
  position: fixed;
  left: 50%;
  margin-left: -125px;
  top: 50px;
  color: ${theme.color.global.textAlt};
  font-size: 80px;
  padding: 25px;
  z-index: 2000;
  width: 200px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  display: none;
  background: rgba(0, 0, 0, 0.8);
  filter: ~"progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";
`);

const App = ({ children, location }) => (
  <CurrentUserProvider>
    <CurrentUserContext.Consumer>
      {(currentUser) => {
        if (!currentUser) {
          return <Spinner />;
        }
        return (
          <ScratchpadProvider loginName={currentUser.username}>
            <Navigation requestPath={location.pathname}
                        fullName={currentUser.full_name}
                        loginName={currentUser.username}
                        permissions={currentUser.permissions} />
            <ScrollToHint id="scroll-to-hint">
              <Icon name="arrow-up" />
            </ScrollToHint>
            <Scratchpad />
            <AppErrorBoundary>
              {children}
            </AppErrorBoundary>
          </ScratchpadProvider>
        );
      }}
    </CurrentUserContext.Consumer>
  </CurrentUserProvider>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  location: PropTypes.object.isRequired,
};

export default App;
