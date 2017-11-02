import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  //Firebase
  constructor() {
    super();
    this.state = {
      user: null // not logged in == null
    }
}


  render() {
    return (
      <div className="wrapper">
        <h1>Cinco Gatos</h1>
        {/*If the value of user is true they will see logout
          if null they will be shown an option to login*/}
        {this.state.user ?
          <button onClick={this.logout}>Log Out</button>
          :
          <button onClick={this.login}>Log In</button>
        }
      </div>
    );
  }
}

export default App;
