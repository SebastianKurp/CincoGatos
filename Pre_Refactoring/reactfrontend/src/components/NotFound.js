import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class NotFound extends Component {

    render() {
      return (
        <div id='body'>
        <Grid fluid>
        <Row>
          <Col xs={12}>
            <Row center="xs">
            <h4>404 Page not found</h4>
              <Col xs={6} />
            </Row>
          </Col>
        </Row>
        </Grid>
      </div>
      );
    }
  }

export default NotFound;
