import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Clip from './components/Clip'
import Header from './components/Header'
import Footer from './components/Footer'
import Welcome from './components/Welcome'
import About from './components/About'
import Help from './components/Help'
import Privacy from './components/Privacy'
import Page404 from './components/Page404'
import './App.sass'

const store = configureStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path='/' component={Welcome} exact />
          <Route path='/about' component={About} />
          <Route path='/help' component={Help} />
          <Route path='/privacy' component={Privacy} />
          <Route path='/:clipKey(\w*)' component={Clip} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </Provider>
    )
  }
}
export default withRouter(App)
