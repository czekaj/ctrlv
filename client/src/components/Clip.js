import React, { Component } from 'react'

export default class Clip extends Component {
  render () {
    return (
      <div>
        <h3>Here's your clip:</h3>
        <form>
          <p>key: {this.props.clip.key}</p>
          <textarea value={this.props.clip.text} />
          <button>Save</button>
          <p>created on: {this.props.clip.createdOn.toString()}</p>
        </form>
      </div>
    )
  }
}
