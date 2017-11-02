import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase.js';

class Login extends Component {


render() {
  return(
  <div>
  <button style={{width: "100%"}} onClick={() => { this.authWithGoogle()}}>Login with Google</button>
  <hr style={{marginTop: "10px", marginBotton: "10px"}}/> {/*Thi is just a css element making a soft line*/}
  <form onSubmit={(event) => this.authWithEmail(event)}
  ref={(form) => {this.loginForm = form} }>
  <div style={{marginBotton: "10px"}}>
  <h5>Note</h5>
  If you do not have an account already please create one here
  </div>
  <label>Email</label>
  <input style={{width:"100%"}} name="email" type="email"
  ref={(input) => {this.emailInput = input}} placeholder="Email"></input>
  </form>
  </div>
)
}


}

  export default Login;
