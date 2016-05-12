import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

function reduxDevtools() {
  return typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' && process.env.NODE_ENV === 'development'
    ? window.devToolsExtension()
    : f => f;
}

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState, reduxDevtools());
}
