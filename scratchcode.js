render() {
    return this.state.loading === true ? 
<div>
    <h1>Loading</h1>
    <img src={require('./images/loading_blue.gif')} />
    </div>
     : (
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
                    <Link to='/uploaddoc' className="navbar-brand">Create Flashcards</Link>
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
                <PrivateRoute authenticated={this.state.authenticated} path='/uploaddoc' component={UploadDoc} />
                <PrivateRoute authenticated={this.state.authenticated} path='/welcome' component={ShowSets}/>
                <PrivateRoute authenticated={this.state.authenticated} path='/animals' component={Animals}/>
                <PublicRoute path="*" component={NotFound}/>
              </Switch> 
        </div>
      </BrowserRouter>
    );
  }
}
