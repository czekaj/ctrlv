import React, { Component } from 'react'
import Clip from './components/Clip'

export default class App extends Component {
  state = {
    clip: {
      url: 'first',
      text: 'This is my saved message.',
      createdOn: new Date()
    }
  }
  render () {
    return (
      <div>
        <h1>Hello CtrlV!!!</h1>
        {this.state.clip && <Clip clip={this.state.clip} />}
      </div>
    )
  }
}
