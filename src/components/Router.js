import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { reset } from '../lib/Auth/actions';

import App from './App';
import Dashboard from './Dashboard';
import Login from './Login';

export default function createRoutes(store) {
  const requireAuth = function(nextState, replace) {
    if (!store.getState().auth.token) {
      store.dispatch(reset());
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} onEnter={requireAuth}/>
        <Route path="login" component={Login}/>
      </Route>
    </Router>
  );
}
