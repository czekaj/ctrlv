import React, { Component } from 'react'

export default class Clip extends Component {
  // componentDidMount () {
  //   this.setState(() => {
  //     return ({
  //       clip: this.props.clip
  //     })
  //   })
  // }
  handleClipSave = (e) => {
    e.preventDefault()
    this.props.handleClipSave(this.state.text)
  }
  handleChange = (event) => {
    this.setState({ text: event.target.value })
  }
  render () {
    const clip = this.props.clip
    return (
      <div className='clip'>
        <h5>
          {!clip._id && <span className='badge badge-success clip__badge'>NEW CLIP</span>}
          {clip._id && <span className='badge badge-warning clip__badge'>EXISTING CLIP</span>}
           /{this.props.clip.key}
        </h5>
        <form onSubmit={this.handleClipSave}>
          <div className='form-group'>
            <textarea
              id='clipText'
              className='form-control form-control-lg clip__textarea'
              onChange={this.handleChange}
              placeholder='Your clip text here'
              value={clip.text}
            />
            <p className='small'>
              {clip.createdAt && <span>created at: {clip.createdAt.toString()}</span>}
            </p>
            <div>
              {!clip._id && <button className='btn btn-primary'>Create clip</button>}
              {clip._id && <button className='btn btn-dark'>Copy to clipboard</button>}
              {clip._id && <button className='btn btn-danger'>Delete clip</button>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}
