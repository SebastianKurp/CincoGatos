import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Animals extends Component {

    render() {
      return (
        <div id='body'>
        <Grid fluid>
        <Row>
          <Col xs={12}>
            <Row center="xs">
            Animals
              <Col xs={6} />
            </Row>
          </Col>
        </Row>
        </Grid>
      </div>
      );
    }
  }

export default Animals;
