import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Typed from 'typed.js'

class Welcome extends Component {
  componentDidMount () {
    const options = {
      strings: ['...', 'anything you will easily remember...', '...but no spaces or special characters ;)', '>'],
      attr: 'placeholder',
      typeSpeed: 70,
      backSpeed: 20,
      onComplete: (self) => {
        document.getElementById('new-clip-key').focus()
      }
    }
    this.typed = new Typed(this.el, options)
    document.title = 'ctrlv.app'
  }

  componentWillUnmount () {
    this.typed.destroy()
  }

  handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newClipKey = document.getElementById('new-clip-key').value.toLowerCase()
    this.props.history.push('/' + newClipKey)
    window.location.reload()
  }

  render () {
    return (
      <div className='container welcome'>
        <div className='lead'>Pick a link</div>
        <div className='input-group input-group-lg welcome__input-group--xl'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='new-clip-site'>ctrlv.app/</span>
          </div>
          <input type='text' className='form-control' id='new-clip-key' aria-describedby='new-clip-key' placeholder='anything' ref={(el) => { this.el = el }} onKeyDown={this.handleOnKeyDown} />
          <div className='input-group-append'>
            <button onClick={this.handleSubmit} className='btn btn-outline-success' type='button' id='new-clip-button'>GO</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Welcome)
