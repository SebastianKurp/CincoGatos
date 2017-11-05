import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom'
import { logout } from './UserFunctions'

class AllSets extends Component {

    render() {
      return (
        <body>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Cinco Gatos</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                <span>
                    <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                    </span>
                </li>
              </ul>
            </div>
          </nav>
          </div>
        <Grid fluid>
        <Row around="xs">
          <Col xs={0}/>
          <img src={require('../images/cat.jpg')} height={150} alt={"cat"} />
          <img src={require('../images/whale.gif')} height={150} alt={"whale"}/>
          <img src={require('../images/walrus.gif')} height={150} alt={"walrus"}/>
          </Row>
          <Row around="xs">
          <Col xs={0} />
          <img src={require('../images/giraffe.gif')} height={150} alt={"giraffe"} />
          <img src={require('../images/owl.gif')} height={150} alt={"owl"}/>
          <img src={require('../images/monkey.gif')} height={150} alt={"monkey"}/>
          <img src={require('../images/fox.gif')} height={150} alt={"fox"}/>
        </Row>
        <Row around="xs">
        <Col xs={0}/>
        <img src={require('../images/dog.gif')} height={150} alt={"dog"}/>
        <img src={require('../images/mouse.jpg')} height={150} alt={"mouse"}/>
        <img src={require('../images/elephant.gif')} height={150} alt={"elephant"}/>
        </Row>
        <Row around="xs">
        <Col xs={0}/>
        <img src={require('../images/parrot.gif')} height={150} alt={"parrot"}/>
        <img src={require('../images/frog.gif')} height={150} alt={"frog"}/>
        </Row>
        </Grid>
        </body>
      );
    }
  }

export default AllSets;
