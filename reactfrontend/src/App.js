import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { logout } from './components/UserFunctions'
import ShowSets from './components/ShowSets'
import Animals from './components/Animals'
import NotFound from './components/NotFound'
import Home from './components/Home'
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
      : <Redirect to='/login' />}
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
        {/*Below is a navbar that renders everywhere the user is
          It will show different links based on whether or not this.state.authenticated is true
          or not*/}
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
                    <Link to='/welcome' className="navbar-brand">Learn!</Link>
                    <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                    </span>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/signup" className="navbar-brand">Sign Up</Link>
                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          {/*This is what renders below the nav bar. The components act as pages
            which fill use the space underneath the above div*/}
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authenticated={this.state.authenticated} path='/login' component={Login} />
                <PublicRoute authenticated={this.state.authenticated} path='/signup' component={Signup} />
                <PrivateRoute authenticated={this.state.authenticated} path='/welcome' component={ShowSets}/>
                <PrivateRoute authenticated={this.state.authenticated} path='/animals' component={Animals}/>
                <PublicRoute path="*" component={NotFound}/>
              </Switch> 
        </div>
      </BrowserRouter>
    );
  }
}
