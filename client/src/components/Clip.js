import React, { Component } from 'react'

export default class Clip extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clip: props.clip,
      text: ''
    }
  }
  componentDidMount () {
    this.setState(() => {
      return ({
        text: this.props.clip.text
      })
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.clip !== this.props.clip) {
      this.setState((prevState) => {
        return (
          { clip: this.props.clip,
            text: this.props.clip.text
          }
        )
      })
    }
  }
  handleClipDelete = (e) => {
    e.preventDefault()
    this.props.handleClipDelete(this.state.clip)
    this.setState(() => {
      return (
        { text: '' }
      )
    })
  }
  handleClipSave = (e) => {
    e.preventDefault()
    this.props.handleClipSave(this.state.text)
  }
  handleCopyToClipboard = (e) => {
    e.preventDefault()
    const elementToCopy = document.getElementById('clipText')
    elementToCopy.select()
    document.execCommand('copy')
  }
  handleChange = (e) => {
    e.persist()
    this.setState(() => {
      return (
        { text: e.target.value }
      )
    })
  }
  render () {
    const clip = this.state.clip
    return (
      <div className='clip'>
        <h5>
          {!clip._id && <span className='badge badge-success clip__badge'>NEW CLIP</span>}
          {clip._id && <span className='badge badge-warning clip__badge'>EXISTING CLIP</span>}
           /{clip.key}
        </h5>
        <form onSubmit={this.handleClipSave}>
          <div className='form-group'>
            <textarea
              id='clipText'
              className='form-control form-control-lg clip__textarea'
              onChange={this.handleChange}
              placeholder='Your clip text here'
              value={this.state.text}
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
