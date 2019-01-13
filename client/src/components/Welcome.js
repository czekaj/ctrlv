import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Typed from 'typed.js'

class Welcome extends Component {
  componentDidMount () {
    const options = {
      strings: ['anything', 'you', 'can', 'easily', 'remember', 'but', 'no', 'spaces', 'or', 'special', 'characters', ':)', '...'],
      attr: 'placeholder',
      typeSpeed: 100,
      backSpeed: 50
    }
    this.typed = new Typed(this.el, options)
  }

  componentWillUnmount () {
    this.typed.destroy()
  }

  handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    const newClipKey = document.getElementById('new-clip-key').value
    this.props.history.push('/' + newClipKey)
    window.location.reload()
  }

  render () {
    return (
      <div className='container welcome'>
        <div className='lead'>Pick an url</div>
        <div className='input-group input-group-lg welcome__input-group--xl'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='new-clip-site'>https://ctrlv.app/</span>
          </div>
          <input type='text' className='form-control' id='new-clip-key' aria-describedby='basic-addon3' placeholder='anything' ref={(el) => { this.el = el }} onKeyDown={this.handleOnKeyDown} />
          <div className='input-group-append'>
            <button onClick={this.handleSubmit} className='btn btn-outline-success' type='button' id='new-clip-button'>GO</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Welcome)
