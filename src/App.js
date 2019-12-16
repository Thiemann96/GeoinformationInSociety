import React,{Component} from 'react';
import './App.css';
//packages installed via npm
// functional component which loads the map class
import Map from './components/Map/Map'
import 'mapbox-gl/dist/mapbox-gl.css';

// Main app class which holds all components later on

class App extends Component {
  
  render() 
  {

    return (
      <Map/>
    );
  }
}

export default App;
