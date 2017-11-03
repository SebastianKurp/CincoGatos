import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase.js';

const loginStyle = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
} //this allows for easy styling of divs within render

class Login extends Component {
constructor(props){
  super(props);
  this.authWithGoogle = this.authWithGoogle.bind(this);
  this.authWithEmail = this.authWithEmail.bind(this);
}

authWithGoogle(){
  console.log("Auth with Google");
}

authWithEmail(e){
  e.preventDefault();
  console.log("Auth with email");
  console.table([{
    email: this.emailInput.value,
    password: this.emailInput.value
  }])
}

render() {
  return(
  <div style={loginStyle}>
  <button style={{width: "100%", background:"#dd3540", color:"white"}} onClick={() => { this.authWithGoogle()}}>Login with Google</button>
  <hr style={{marginTop: "10px", marginBotton: "10px"}}/> {/*Thi is just a css element making a soft line*/}
  <form onSubmit={(event) => {this.authWithEmail(event)}}
  ref={(form) => {this.loginForm = form} }>
  <div style={{marginBotton: "10px"}}>
  If you do not have an account already please create one here
  </div>
  <label>Email</label>
  <input style={{width:"100%"}} name="email" type="email"
  ref={(input) => {this.emailInput = input}} placeholder="Email"></input>
  <label>Password</label>
  <input style={{width:"100%"}} name="password" type="password"
  ref={(input) => {this.passwordInput = input}} placeholder="Password"></input>
  <input style={{width:"100%"}} type="submit" value="Login/Signup"></input>
  </form>
  </div>
)
}


}

  export default Login;
