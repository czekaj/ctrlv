import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Clip from './components/Clip'

class App extends Component {
  state = {
    clip: undefined,
    location: undefined
  }

  fetchClip = (key) => {
    axios.get(`/api/${key}`)
      .then(res => {
        if (res.status === 200) {
          if (res.data && res.data.clip) {
            this.setState(() => {
              return {
                clip: res.data.clip,
                location: '/' + key
              }
            })
          }
        }
        else if (res.status === 204) {
          this.setState(() => {
            return {
              clip: {
                key
              },
              location: '/' + key
            }
          })
        }
      })
      .catch((reason) => {
        console.error('get call rejected', reason)
      })
  }

  componentDidMount () {
    const key = this.props.location.pathname.substr(1)
    if (!key) return
    console.log('componentDidMount')
    this.fetchClip(key)
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
