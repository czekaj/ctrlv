import React, { Component } from 'react'
import TextArea from 'react-textarea-autosize'
import axios from 'axios'
import { connect } from 'react-redux'
import { createClip, updateClip, deleteClip } from '../actions/clip'
import { throwError, clearError } from '../actions/error'

class Clip extends Component {
  constructor (props) {
    super(props)
    this.fetchClip(props.match.params.clipKey)
  }
  componentDidMount () {
    this.props.dispatch(clearError())
    document.title = 'ctrlv.app/' + this.props.match.params.clipKey
    this.textarea.focus()
  }
  handleClipDelete = (e) => {
    e.preventDefault()
    const key = this.props.clip.key
    axios.delete(`/api/${key}`).then((res) => {
      console.log('Deleted clip', res.data)
      this.props.dispatch(deleteClip(key))
    }).catch((err) => {
      if (err.response && err.response.data) {
        this.props.dispatch(throwError(err.response.data))
      }
      console.log('Can\'t delete clip', err)
    })
  }
  handleClipSave = (e) => {
    e.preventDefault()
    const clipToSave = this.props.clip
    if (!clipToSave._id) { // new clip, never saved to the db
      axios.post(`/api/${clipToSave.key}`, clipToSave).then((res) => {
        console.log('Saved new clip', res.data)
        this.props.dispatch(createClip(res.data.clip))
      }).catch((err) => {
        if (err.response && err.response.data) {
          this.props.dispatch(throwError(err.response.data))
        }
        console.log('Can\'t save new clip', err)
      })
    }
  }

  fetchClip = (key) => {
    let clip = {}
    axios.get(`/api/${key}`)
      .then(res => {
        if (res.status === 200) {
          if (res.data && res.data.clip) {
            clip = res.data.clip
          }
        } else if (res.status === 204) {
          clip = { key } // does not exist so creating a stub
        }
        this.props.dispatch(createClip(clip))
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.props.dispatch(throwError(err.response.data))
        }
        console.log('Can\'t fetch clip', err)
      })
  }

  // /from App

  handleCopyToClipboard = (e) => {
    e.preventDefault()
    const elementToCopy = document.getElementById('clipText')
    elementToCopy.select()
    document.execCommand('copy')
  }
  handleChange = (e) => {
    this.props.dispatch(updateClip(e.target.value))
  }
  render () {
    const clip = this.props.clip
    return (
      <div className='container clip'>
        {this.props.error.message &&
          <div className='alert alert-danger' role='alert' >
            {this.props.error.message}
          </div>
        }
        <h5>
          {!clip._id && <span className='badge badge-success clip__badge'>NEW CLIP</span>}
          {clip._id && <span className='badge badge-warning clip__badge'>EXISTING CLIP</span>}
           /{clip.key}
        </h5>
        <form onSubmit={this.handleClipSave}>
          <div className='form-group'>
            <TextArea
              id='clipText'
              minRows={2}
              readOnly={!!clip._id}
              inputRef={tag => (this.textarea = tag)}
              className='form-control form-control-lg clip__textarea'
              onChange={this.handleChange}
              placeholder='Your clip text here'
              value={clip.text || ''}
            />
            <p className='small float-right'>
              {clip.createdAt && <span>created at: {clip.createdAt.toString()}</span>}
            </p>
            <div>
              {!clip._id && <button className='btn btn-primary'>Create clip</button>}
              {clip._id && <button className='btn btn-dark' onClick={this.handleCopyToClipboard}>Copy to clipboard</button>}
              {clip._id && <button className='btn btn-danger' onClick={this.handleClipDelete}>Delete clip</button>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clip: state.clip,
    error: state.error
  }
}

export default connect(mapStateToProps)(Clip)
