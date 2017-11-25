import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { logout } from './UserFunctions'

//I keep trying to make a navbar that can be used in all pages
//but the user auth is causing issues
class NavBar extends Component {

  render(){
    return(
<div>
<nav className="navbar navbar-default navbar-static-top">
  <div className="container">
    <div className="navbar-header">
      <Link to="/" className="navbar-brand">Cinco Gatos</Link>
    </div>
    <ul className="nav navbar-nav pull-right">
      <li>
        {this.state.authenticated
          ?<span>
          <button
              style={{border: 'none', background: 'transparent'}}
              onClick={() => {
                logout()
              }}
              className="navbar-brand">Logout</button>
          </span>
          : <span>
              <Link to="/login" className="navbar-brand">Login</Link>
              <Link to="/register" className="navbar-brand">Register</Link>
            </span>}
      </li>
    </ul>
  </div>
</nav>
</div>
)}
}

export default NavBar
