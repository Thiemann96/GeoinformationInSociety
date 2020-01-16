import React,{Component,Fragment} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer,PolygonLayer} from '@deck.gl/layers';
import Overlay from '../Overlays/Overlay'
import {HeatmapLayer} from '@deck.gl/aggregation-layers'
import { extent, scaleLinear } from 'd3';
import DelayedPointLayer from './DelayedPointLayer';
import anime from 'animejs'
import GL from '@luma.gl/constants';
import throttle from 'lodash.throttle';
import bikeonly from '../../data/bike-only.json'

const librariesAnimation = { enterProgress: 0 ,duration:5000};

const updateLayers = throttle(function updateLayersRaw(that,bike) {
  const layers = [];
  const accidentLayer = new DelayedPointLayer({
    id: 'points-layer',
    data: bike,
    getPosition: d => [d.lon,d.lat],
    getFillColor: [250, 100, 200],
    getRadius: 50,
    radiusMinPixels: 1,

    // specify how far we are through the animation (value between 0 and 1)
    animationProgress: librariesAnimation.enterProgress,

    // specify the delay factor for each point (value between 0 and 1)
    getDelayFactor: d => {
      let date = new Date(d.date+"T"+d.time_of_day+".000Z");
      // return longitudeDelayScale(d.lon)}
      return timeDelayScale(date.getTime()/1000)}
    // parameters: {
    //   // prevent flicker from z-fighting
    //   [GL.DEPTH_TEST]: false,

    //   // turn on additive blending to make them look more glowy
    //   [GL.BLEND]: true,
    //   [GL.BLEND_SRC_RGB]: GL.ONE,
    //   [GL.BLEND_DST_RGB]: GL.ONE,
    //   [GL.BLEND_EQUATION]: GL.FUNC_ADD,
    // },
  });
  layers.push(accidentLayer);

  that.setState({
    layers,
    // TODO: may be a bug, but this is required to prevent transitions from restarting
     viewState: that.state.viewState,
  });

}, 8);

const DATA_URL = {
  ACCIDENTS:
    "https://raw.githubusercontent.com/Thiemann96/GeoinformationInSociety/dump_database/web-app/src/data/bike-only.json?token=AELUZUW7LX5SDNQESOHRBX26DNIFM",
  BUILDINGS:
    "https://raw.githubusercontent.com/Thiemann96/GeoinformationInSociety/master/src/muenster_buildings.json?token=AELUZUUORODVEKNMRTORCT26DNCEE"
};


      // 2015-01-04
      // 20:45:00
      // d.date +"T"+d.time_of_day+".000Z"
      let date = new Date("2015-01-04T20:45:00.000Z")
      let date2 = new Date("2016-01-04T20:45:00.000Z")
      
      console.log(date.getTime()/1000);
      console.log(date2.getTime()/1000);

const longitudeDelayScale = scaleLinear().domain(extent(bikeonly,d=>d.lon)).range([1,0]);
const latitudeDelayScale = scaleLinear().domain(extent(bikeonly,d=>d.lat)).range([1,0]);
const timeDelayScale = scaleLinear().domain(extent(bikeonly,d=>{
  let date = new Date(d.date+"T"+d.time_of_day+".000Z");
  return date.getTime()/1000;
})).range([1,0]);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewState: {
        longitude: 7.615322135118181,
        latitude: 51.96970534849527,
        // longitude:-78.8006344148876,
        // latitude:39.09086893888812,
        zoom: 12,
        pitch: 0,
        bearing: 0
      },
      animate:false,
      interactionState:{},
      mapBoxToken:'pk.eyJ1IjoiZXRoaWUxMCIsImEiOiJjazQyeXlxNGcwMjk3M2VvYmw2NHU4MDRvIn0.nYOmVGARhLOULQ550LyUYA',
      accidents:[]
    }

    this._toggleAccidents = this._toggleAccidents.bind(this);
    this._toggleHeatMap = this._toggleHeatMap.bind(this);
    this._toggleBuildings = this._toggleBuildings.bind(this);
    this._confirmFilter = this._confirmFilter.bind(this);
    this._resetFilter = this._resetFilter.bind(this);
    this._playAnimation = this._playAnimation.bind(this);
    this._animate = this._animate.bind(this);
    this._renderLayers = this._renderLayers.bind(this);
  }

  _animate(){
    let that = this;
    const animation = anime({
      duration: librariesAnimation.duration,
      targets: librariesAnimation,
      enterProgress: 1,
      easing: 'linear',
      begin:function(anim){
        console.log("begin");
      },
      complete:function(anim){
        console.log("end");
        that.setState({animate:false,layers:[]})
      },
      update() {
        // each tick, update the DeckGL layers with new values
        updateLayers(that,that.state.accidents);
      },
    });
    updateLayers(that,that.state.accidents);
    
  }

  // fetches all accidents from the server running locally
  componentDidMount() {
    let url = "http://0.0.0.0:9000/hooks/bikes";
    fetch(url)
      .then(response => response.json())
      .then(accidents => this.setState({ accidents }));



  }

  _toggleHeatMap(e) {
    this.setState({
      showHeatmapLayer: e.target.checked
    });
  }
  _toggleAccidents(e) {
    this.setState({
      showAccidentsLayer: e.target.checked
    });
  }
  _toggleBuildings(e) {
    this.setState({
      showBuildings: e.target.checked
    });
  }
  _playAnimation(){
    this.setState(()=>{
      return{
        animate:true }
    })
    this._animate();
  }

  // Uses new filter options and sends new request
  _confirmFilter(filterObject) {
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
      .then(response => response.json())
      .then(accidents => this.setState({ accidents }));
  }

  _renderLayers() {
    const {
      accidents = DATA_URL.ACCIDENTS,
      buildings = DATA_URL.BUILDINGS
    } = this.props;

    return[
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
          data:this.state.accidents,
          id:'heatmapLayer',
          pickable:false,
          getPosition:d=>[d.lon,d.lat],
          getWeight:1,
          radiusPixels:30,
          intensity : 1,
          threshold : 0.03
        }):null
      ]
  };
  
  render() {
     return (
      <Fragment>
      <DeckGL
        initialViewState={this.state.viewState}
        controller={true}
        layers={  
          this.state.animate?  
          this.state.layers
        : this._renderLayers()}
      >
        <StaticMap   
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={this.state.mapBoxToken}/>
        </DeckGL>
        <Overlay 
                _animate={this._playAnimation}
                _toggleBuildings={this._toggleBuildings} _toggleHeatMap={this._toggleHeatMap} _toggleAccidents={this._toggleAccidents}
                datalength = {this.state.accidents.length}
                _confirmFilter = {this._confirmFilter}
                _resetFilter  = {this._resetFilter}

        />
      </Fragment>
    );
  }
}
export default Map;
