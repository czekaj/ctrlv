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
    return (
      <div className='clip'>
        <p>{!this.props.clip._id ? 'Creating new clip' : 'Showing existing clip saved'} at /{this.props.clip.key}</p>
        <p>
          <form onSubmit={this.handleClipSave}>
            <textarea className='clip__textarea' value={this.props.clip.text} onChange={this.handleChange} />
            <button>Save</button>
          </form>
        </p>
        <p>
          {this.props.clip.createdAt && <p>created at: {this.props.clip.createdAt.toString()}</p>}
        </p>
      </div>
    )
  }
}
