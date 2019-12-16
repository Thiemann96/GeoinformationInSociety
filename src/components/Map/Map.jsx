import React,{Component,Fragment} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import Overlay from '../Overlays/Overlay'

class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
      viewState:{
        longitude: 7.5922197,
        latitude: 51.9688129,
        zoom: 13,
        pitch: 0,
        bearing: 0
      },
      interactionState:{},
      data: [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}],
      mapBoxToken:'pk.eyJ1IjoiZXRoaWUxMCIsImEiOiJjazQyeXlxNGcwMjk3M2VvYmw2NHU4MDRvIn0.nYOmVGARhLOULQ550LyUYA'
    }
  }
  
  render() {
    console.log(this.state.settings)
    return (
      <Fragment>
      <DeckGL
        initialViewState={this.state.viewState}
        controller={true}
      >
        <StaticMap   
                onInter 
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={this.state.mapBoxToken}/>
        </DeckGL>
                <Overlay/>

        </Fragment>
      );
  }
}
export default Map