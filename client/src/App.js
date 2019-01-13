import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import Clip from './components/Clip'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Help from './components/Help'
import Privacy from './components/Privacy'
import './App.sass'

class App extends Component {
  state = {
    clipKey: undefined,
    staticPage: true
  }

  componentDidMount () {
    const clipKey = this.props.location.pathname.substr(1)
    if (!clipKey) return
    this.setState(() => {
      return (
        { clipKey,
          staticPage: Object.keys(this.staticComponents).indexOf(clipKey) >= 0 }
      )
    })
  }

  staticComponents = {
    about: About,
    help: Help,
    privacy: Privacy
  }
  render () {
    return (
      <div>
        <Header />
        { Object.keys(this.staticComponents).map((comp) => {
          return <Route path={'/' + comp} key={comp} component={this.staticComponents[comp]} />
        })
        }
        {!this.state.clipKey &&
          <div
            className='alert alert-primary'
            role='alert'>
              Please navigate to an arbitrary url to create your clip (e.g. /abcdef)
          </div>
        }
        {!this.state.staticPage && this.state.clipKey &&
          <Clip
            clipKey={this.state.clipKey}
            handleClipDelete={this.handleClipDelete}
            handleClipSave={this.handleClipSave}
          />}
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
