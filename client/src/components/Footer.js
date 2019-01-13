import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <div className='container footer'>
        <div>
          Made with <span role='img'>❤</span>️ in San Francisco
        </div>
        <div className='footer__website'>
          <a href='https://czekaj.us'>czekaj.us</a>
        </div>
      </div>
    )
  }
}

export default Footer
