import React,{Component,Fragment} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {PolygonLayer} from '@deck.gl/layers';
import Overlay from '../Overlays/Overlay'
import * as data from '../../muenster_buildings.json'


const DATA_URL = {
  BUILDINGS:
'https://raw.githubusercontent.com/Thiemann96/GeoinformationInSociety/master/src/muenster_buildings.json?token=AELUZUS2BCSKD3AW4R3CQSS6AFI4M'
};

class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
      viewState:{
        longitude: 7.615322135118181,
        latitude: 51.96970534849527,
        // longitude:51.96582703740133,
        // latitude:7.622390870898665,
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      interactionState:{},
      data: [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}],
      mapBoxToken:'pk.eyJ1IjoiZXRoaWUxMCIsImEiOiJjazQyeXlxNGcwMjk3M2VvYmw2NHU4MDRvIn0.nYOmVGARhLOULQ550LyUYA'
    }
  }

  _renderLayers() {
    const {
      buildings = DATA_URL.BUILDINGS,
    } = this.props;
    return [
      // This is only needed when using shadow effects
      new PolygonLayer({
        id: 'buildings',
        data: buildings,
        extruded: true,
        wireframe: false,
        opacity: 0.5,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: [255, 255, 0]
      })

    ];
  }
  
  render() {

    return (
      <Fragment>
      <DeckGL
        initialViewState={this.state.viewState}
        controller={true}
        layers={this._renderLayers()}
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