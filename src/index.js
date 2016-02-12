import '../styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactToolbox from 'react-toolbox/lib/app';
import createRoutes from './components/Router';
import configureStore from './lib/store';

const store = configureStore();

ReactDOM.render(
  <ReactToolbox>
    <Provider store={store}>
      {createRoutes(store)}
    </Provider>
  </ReactToolbox>,
  document.getElementById('app')
);
