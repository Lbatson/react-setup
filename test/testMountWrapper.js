import './helper';
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import configureStore from '../src/lib/store';

export default (Component, context) => mount((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={configureStore()}>
      {Component}
    </Provider>
  </MuiThemeProvider>
), context ? { context } : undefined);
