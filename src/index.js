import '../styles/main.scss';
import 'flexboxgrid';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createRoutes from './components/Router';
import configureStore from './lib/store';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      {createRoutes(store)}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
