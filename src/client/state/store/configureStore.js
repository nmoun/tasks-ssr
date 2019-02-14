import { createStore, applyMiddleware } from 'redux'
import reducer from 'state/reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

export const configureStore = () => {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : {}
  const logger = createLogger({})
  const middlewares = [thunk, logger]
  let store = createStore(reducer, preloadedState, applyMiddleware(...middlewares))

  if(module.hot){
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store
} 