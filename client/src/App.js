import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import Clip from './components/Clip'
import Header from './components/Header'
import Footer from './components/Footer'
import Welcome from './components/Welcome'
import About from './components/About'
import Help from './components/Help'
import Privacy from './components/Privacy'
import Page404 from './components/Page404'
import './App.sass'

class App extends Component {
  render () {
    return (
      <div>
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
      </div>
    )
  }
}
export default withRouter(App)
