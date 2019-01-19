import { createStore, combineReducers } from 'redux'
import clipReducer from '../reducers/clip'
import errorReducer from '../reducers/error'

export default () => {
  const store = createStore(
    combineReducers({
      clip: clipReducer,
      error: errorReducer
    })
  )
  store.subscribe(() => {
    console.log(store.getState())
  })
  return store
}
