import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import Bar from './Bar'

class Animals extends Component {

      componentDidMount(){
    let c = ReactDOM.findDOMNode(this.refs.myCanvas);
    let ctx = c.getContext('2d');
    var buttons, bars, mouseX = 0, mouseY = 0, keyPresses, mouseDown = false, clickBuffer = "None";
    c.style.backgroundColor = "#000000";

  }



    render() {
      return (
        <div id='body'>
       <canvas ref="myCanvas" />
      </div>
      );
    }
  }

export default Animals;
