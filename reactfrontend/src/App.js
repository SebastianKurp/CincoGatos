import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  //Firebase
  constructor() {
    super();
    this.state = {
      authenticated: false
    }
}


  render() {
    return (
      <div className="wrapper">
        <h1>Cinco Gatos</h1>
        {/*This will eventually show a login prompt if they are not signed in
          or all user options if they are*/}
        {this.props.authenticated
        ?(
          <h2>You're a valid user!</h2>
        )
      :
      (
        <h2>You are not a valid user</h2>
      )}
      </div>
    );
  }
}

export default App;
