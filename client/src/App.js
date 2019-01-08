import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Clip from './components/Clip'
import Header from './components/Header'
import './App.sass'

class App extends Component {
  state = {
    clip: undefined
  }

  fetchClip = (key) => {
    axios.get(`/api/${key}`)
      .then(res => {
        if (res.status === 200) {
          if (res.data && res.data.clip) {
            this.setState(() => {
              return {
                clip: res.data.clip
              }
            })
          }
        } else if (res.status === 204) {
          this.setState(() => {
            return {
              clip: { key }
            }
          })
        }
      })
      .catch((reason) => {
        console.error('get call rejected', reason)
      })
  }

  handleClipDelete = (clip) => {
    axios.delete(`/api/${clip.key}`).then((res) => {
      console.log('Deleted clip', res.data)
      this.setState(() => {
        return ({
          clip: {
            key: clip.key
          }
        })
      })
    }).catch((err) => {
      console.log('Can\'t delete clip', err)
      return err
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
        {!this.state.clip &&
          <div
            className='alert alert-primary'
            role='alert'>
              Please navigate to an arbitrary url to create your clip (e.g. /abcdef)
          </div>
        }
        {this.state.clip &&
          <Clip
            clip={this.state.clip}
            handleClipDelete={this.handleClipDelete}
            handleClipSave={this.handleClipSave}
          />}
      </div>
    )
  }
}

export default withRouter(App)
