import React, { Component } from 'react'

export default class Clip extends Component {
  render () {
    return (
      <div>
        <h3>{!this.props.clip._id ? 'Creating new clip' : 'Your saved clip'}</h3>
        <form>
          <textarea value={this.props.clip.text} />
          <button>Save</button>
          {this.props.clip.createdAt && <p>created at: {this.props.clip.createdAt.toString()}</p>}
        </form>
      </div>
    )
  }
}
