import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container,Row,Col} from 'react-bootstrap'
import Map from './components/Map/Map'
// Viewport settings


class App extends Component {
  
  render() 
  {

    return (
      <Container fluid>
        <Row>
          <Col md={6}>
            <Map/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
