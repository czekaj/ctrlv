import React, { Component } from 'react'

export default class Header extends Component {
  render = () => (
    <div className='jumbotron jumbotron-fluid header'>
      <h1 className='display-4 header__title'>CtrlV</h1>
      <p className='lead'>Paste anything and visit the same url on another machine to view it</p>
    </div>
  )
}
