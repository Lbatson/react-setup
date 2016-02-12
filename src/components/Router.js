import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Dashboard from './Dashboard';
import Login from './Login';
import { resetAuth } from './Login/actions';

// will move out to auth service
let appStore = null;
let authorized = false;
const requireAuth = function (nextState, replace) {
  if (!authorized) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
    appStore.dispatch(resetAuth());
  }
};

export default function createRoutes(store) {
  appStore = store;
  appStore.subscribe(() => {
    authorized = !!store.getState().auth.token;
  });

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} onEnter={requireAuth}/>
        <Route path="login" component={Login}/>
      </Route>
    </Router>
  );
}
