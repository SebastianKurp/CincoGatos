import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { logout } from './components/UserFunctions'
import AllSets from './components/AllSets'
import { fbAuth } from './firebase'


//... notation means you take the whole of the props

function PrivateRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
      : <Redirect to='/welcome' />}
    />
  )
}

export default class App extends Component {
  state = {
    authenticated: false,
    loading: true,
  }
//default assumption of not logged in
//loading necessary because of React pages having that 'flashing' effect

//if they are authenticated set state to true, else, false. If component did mount then loading == false
  componentDidMount () {
    this.removeListener = fbAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }
  //return to defaults
  componentWillUnmount () {
    this.removeListener()
  }


  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
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
          <div className="container">
            <div className="row">
              <Switch>
                <PublicRoute authenticated={this.state.authenticated} path='/login' component={Login} />
                <PublicRoute authenticated={this.state.authenticated} path='/signup' component={Signup} />
                <PrivateRoute authenticated={this.state.authenticated} path='/welcome' component={AllSets}/>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
