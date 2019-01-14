import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render = () => (
    <div className='navbar navbar-dark bg-primary text-white header'>
      <div className='container header__container'>
        <div className='header__title'>
          <Link className='navbar-brand' to='/'>
            <img src='/logo-crop-256.png' alt='ctrlv' />
          </Link>
          <Link className='navbar-brand' to='/'>ctrlv</Link>
        </div>
        <div className='lead header__lead'>copy/paste anywhere</div>
      </div>
    </div>
  )
}
