import React, { Component } from 'react'

export default class Clip extends Component {
  render () {
    return (
      <div>
        <h3>Here's your clip:</h3>
        <p>url: {this.props.clip.url}</p>
        <p>text: {this.props.clip.text}</p>
        <p>created on: {this.props.clip.createdOn.toString()}</p>
      </div>
    )
  }
}
