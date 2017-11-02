import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
//import cat from './public/images';

class AllSets extends Component {

    render() {
      return (
        <Row>
          <Col xs={12} sm={3} md={2} lg={1} />
          <img src={require('../images/cat.jpg')} height={200} />
          <Col xs={6} sm={6} md={8} lg={10} />
          <img src={require('../images/dog.gif')} height={200}/>
          <Col xs={6} sm={3} md={2} lg={1} />
          <img src={require('../images/giraffe.gif')} height={200} />
        </Row>
      );
    }
  }

export default AllSets;
