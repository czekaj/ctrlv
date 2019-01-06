import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Clip from './components/Clip'

class App extends Component {
  state = {
    clip: undefined,
    location: undefined
  }

  fetchClip = (key) => {
    return {
      key: 'first',
      text: 'This is my saved message.',
      createdOn: new Date()
    }
  }

  componentDidMount () {
    const key = this.props.location.pathname.substr(1)
    const clip = this.fetchClip(key)

    this.setState(() => {
      return {
        clip,
        location: '/' + key
      }
    })
  }
  render () {
    return (
      <div>
        <h1>Hello CtrlV!!!</h1>
        <p>You are on {this.state.location}</p>
        {this.state.clip && <Clip clip={this.state.clip} />}
      </div>
    )
  }
}

export default withRouter(App)
