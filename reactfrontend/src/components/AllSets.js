import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
//import cat from './public/images';

class AllSets extends Component {

    render() {
      return (
        <Grid fluid>
        <Row around="xs">
          <Col xs={0}/>
          <img src={require('../images/cat.jpg')} height={150} />
          <img src={require('../images/whale.gif')} height={150}/>
          <img src={require('../images/walrus.gif')} height={150}/>
          </Row>
          <Row around="xs">
          <Col xs={0} />
          <img src={require('../images/giraffe.gif')} height={150} />
          <img src={require('../images/owl.gif')} height={150}/>
          <img src={require('../images/monkey.gif')} height={150}/>
          <img src={require('../images/fox.gif')} height={150}/>
        </Row>
        <Row around="xs">
        <Col xs={0}/>
        <img src={require('../images/dog.gif')} height={150}/>
        <img src={require('../images/mouse.jpg')} height={150}/>
        <img src={require('../images/elephant.gif')} height={150}/>
        </Row>
        <Row around="xs">
        <Col xs={0}/>
        <img src={require('../images/parrot.gif')} height={150}/>
        <img src={require('../images/frog.gif')} height={150}/>
        </Row>
        </Grid>
      );
    }
  }

export default AllSets;
