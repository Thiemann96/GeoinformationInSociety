import React,{Component,Fragment} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer,PolygonLayer} from '@deck.gl/layers';
import Overlay from '../Overlays/Overlay'
import {HeatmapLayer} from '@deck.gl/aggregation-layers'


const DATA_URL = {
  ACCIDENTS:'https://raw.githubusercontent.com/Thiemann96/GeoinformationInSociety/dump_database/web-app/src/data/bike-only.json?token=AELUZUW7LX5SDNQESOHRBX26DNIFM',
  BUILDINGS:
'https://raw.githubusercontent.com/Thiemann96/GeoinformationInSociety/master/src/muenster_buildings.json?token=AELUZUUORODVEKNMRTORCT26DNCEE'
};

class Map extends Component {
  constructor(props){
    super(props)
    this.state = {
      viewState:{
        longitude: 7.615322135118181,
        latitude: 51.96970534849527,
        zoom: 15,
        pitch: 0,
        bearing: 0,
      },
      interactionState:{},
      data: [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}],
      mapBoxToken:'pk.eyJ1IjoiZXRoaWUxMCIsImEiOiJjazQyeXlxNGcwMjk3M2VvYmw2NHU4MDRvIn0.nYOmVGARhLOULQ550LyUYA',
      accidents:[]
    }
    this._toggleAccidents = this._toggleAccidents.bind(this);
    this._toggleHeatMap = this._toggleHeatMap.bind(this);
    this._toggleBuildings = this._toggleBuildings.bind(this);
    this._confirmFilter = this._confirmFilter.bind(this);
    this._resetFilter = this._resetFilter.bind(this);
  }
  // fetches all accidents from the server running locally
  componentDidMount(){
    let url ='http://0.0.0.0:9000/hooks/bikes';
    fetch(url)
    .then(response=>response.json())
    .then(accidents=>this.setState({accidents}))

  }

  _toggleHeatMap(e){
    this.setState({
      showHeatmapLayer:e.target.checked
    })
  }
  _toggleAccidents(e){
    this.setState({
      showAccidentsLayer:e.target.checked
    })
  }
  _toggleBuildings(e){
    this.setState({
      showBuildings:e.target.checked
    })
  }
  
  // Uses new filter options and sends new request
  _confirmFilter(filterObject){
    console.log(filterObject);
    // localhost:9000/hooks/accidents-by-time/date-from=2016-12-19%2017:50:00&date-to=2017-12-19%2017:52:00&min-lon=7.6305772757&            max-lon=10.7305772757&min-lat=51.9468186&max-lat=54.9468186
    // url needs to be changed to the hook that we provide

    // let url = 'http://0.0.0.0:9000/hooks/accidents-by-time?date-from='+filterObject.datefrom+'&date-to='+filterObject.dateTo+'&min-lon='+filterObject.minLon+'&max-lon='+filterObject.maxLon+'&min-lat='+filterObject.minLat+'&max-lat='+filterObject.maxLat;

    // fetch(url)
    // .then(response=>response.json())
    // .then(accidents=>this.setState({accidents}))

  }
  _resetFilter(){
    let url ='http://0.0.0.0:9000/hooks/bikes';
    fetch(url)
    .then(response=>response.json())
    .then(accidents=>this.setState({accidents}))
  }
  _renderLayers() {
    const {
      accidents = DATA_URL.ACCIDENTS,
      buildings = DATA_URL.BUILDINGS,
    } = this.props;

    return [
      // This is only needed when using shadow effects
      // returns the 3dbuildings layer
      this.state.showBuildings ? 
      new PolygonLayer({
        id: 'buildings',
        data: buildings,
        extruded: true,
        wireframe: false,
        opacity: 1,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: [255, 255, 0]
      }):null,
      this.state.showAccidentsLayer ? 
      new ScatterplotLayer({
        data:this.state.accidents,
        id:'accidentsLayer',
        getPosition:d=>[d.lon,d.lat],
        getRadius:5,
        getFillColor:[255,0,0],
        opacity:1
      }):null,
      this.state.showHeatmapLayer?
      new HeatmapLayer({
        data:accidents,
        id:'heatmapLayer',
        pickable:false,
        getPosition:d=>[d.lon,d.lat],
        getWeight:1,
        radiusPixels:30,
        intensity : 1,
        threshold : 0.03
      }):null
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
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={this.state.mapBoxToken}/>
        </DeckGL>
        <Overlay _toggleBuildings={this._toggleBuildings} _toggleHeatMap={this._toggleHeatMap} _toggleAccidents={this._toggleAccidents}
                datalength = {this.state.accidents.length}
                _confirmFilter = {this._confirmFilter}
                _resetFilter  = {this._resetFilter}
        />
        </Fragment>
      );
  }
}
export default Map