import React, { Component } from 'react'
import { auth } from './UserFunctions'
import './styles/signUp-login.css'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}


class Signup extends Component {
  state = { registerError: null }
  
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value, this.native.value, this.learning.value, this.username.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1 id="header">Sign Up</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <div  className="form-group">
            <label>Username</label>
            <input className="form-control" ref={(username) => this.username = username} placeholder="Username"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <div className="form-group">
            <label>
              What is your native language:<br />
              <select ref={(native) => this.native = native}>
                <option value="Error">Select One</option>
                <option value="english">English</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Pick the language you want to learn: <br />
              <select ref={(learning) => this.learning = learning}>
                <option value="Error">Select One</option>
                <option value="spanish">Spanish</option>
                <option value="polish">Polish</option>
                <option value="arabic">Arabic</option>
                <option value="japanese">Japanese</option>
              </select>
            </label>
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button id="signUpBtn" type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default Signup
