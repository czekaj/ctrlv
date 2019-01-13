import React, { Component } from 'react'

export default class Header extends Component {
  render = () => (
    <div className='navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar bg-primary text-white header'>
      <div className='container header__container'>
        <div className='header__title'>
          <a className='navbar-brand' href='/'>ctrlv</a>
        </div>
        <div className='lead header__lead'>visit the same url to copy/paste anywhere</div>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav'>
            {/* <li className='nav-item lead header__lead'>Paste anything and visit the same url on another machine to view it</li> */}
          </ul>
        </div>
      </div>
    </div>
  )
}
