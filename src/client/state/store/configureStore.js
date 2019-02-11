import { createStore, applyMiddleware } from 'redux'
import reducer from 'state/reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { STATE } from 'utils/constants'
import debounce from 'lodash.debounce'

export const configureStore = () => {
  const logger = createLogger({});
  const middlewares = [thunk, logger]
  // const persistedState = localStorage.getItem(STATE) ? JSON.parse(localStorage.getItem(STATE)) : {}
  const persistedState = {}
  let store = createStore(reducer, persistedState, applyMiddleware(...middlewares))

  store.subscribe(debounce(() => {
    localStorage.setItem(STATE, JSON.stringify(store.getState()))
  }, 5000))

  return store
} 