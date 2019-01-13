import React, { Component } from 'react'
import Typed from 'typed.js'

class Welcome extends Component {
  componentDidMount () {
    const options = {
      strings: ['anything', 'you', 'can', 'easily', 'remember', 'but', 'no', 'spaces', 'or', 'special', 'characters', '...', ':)'],
      attr: 'placeholder',
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      bindInputFocusEvents: true
    }
    this.typed = new Typed(this.el, options)
  }

  componentWillUnmount () {
    this.typed.destroy()
  }

  handleOnClick () {
    const newClipKey = document.getElementById('new-clip-key').value
  }

  render () {
    return (
      <div className='container welcome'>
        <h5>Pick an url</h5>
        <div className='input-group input-group-lg welcome__input-group--xl'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='new-clip-site'>https://clip.app/</span>
          </div>
          <input type='text' className='form-control' id='new-clip-key' aria-describedby='basic-addon3' placeholder='anything' ref={(el) => { this.el = el }} />
          <div className='input-group-append'>
            <button onClick={this.handleOnClick} className='btn btn-outline-success' type='button' id='new-clip-button'>GO</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
