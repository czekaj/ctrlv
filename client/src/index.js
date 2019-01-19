import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const store = configureStore()

const appWithStore = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  <BrowserRouter>
    {appWithStore}
  </BrowserRouter>, document.getElementById('root'))
