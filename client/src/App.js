import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Clip from './components/Clip'
import Header from './components/Header'
import './App.scss'

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
        } else if (res.status === 204) {
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

  handleClipSave = (text) => {
    const clipToSave = this.state.clip
    if (clipToSave && clipToSave.key && !clipToSave._id) { // new clip, never saved to the db
      clipToSave.text = text
      console.log('clipToSave', clipToSave)
      axios.post(`/api/${clipToSave.key}`, clipToSave).then((res) => {
        console.log('Saved new clip', res.data)
        this.setState(() => {
          return ({
            clip: res.data.clip
          })
        })
      }).catch((err) => {
        console.log('Can\'t save new clip', err)
      })
    }
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
        <Header />
        {!this.state.clip && <p>Please navigate to an arbitrary url to create your clip (e.g. /abcdef)</p>}
        {this.state.clip && <Clip clip={this.state.clip} handleClipSave={this.handleClipSave} />}
      </div>
    )
  }
}

export default withRouter(App)
