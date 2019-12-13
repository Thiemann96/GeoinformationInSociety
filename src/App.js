import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//packages installed via npm
import {Container,Row,Col} from 'react-bootstrap'
// functional component which loads the map class
import Map from './components/Map/Map'

// Main app class which holds all components later on

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
