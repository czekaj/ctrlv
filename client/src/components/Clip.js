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
      <div>
        <h3>{!this.props.clip._id ? 'Creating new clip' : 'Your saved clip'}</h3>
        <form onSubmit={this.handleClipSave}>
          <textarea value={this.props.clip.text} onChange={this.handleChange} />
          <button>Save</button>
          {this.props.clip.createdAt && <p>created at: {this.props.clip.createdAt.toString()}</p>}
        </form>
      </div>
    )
  }
}
