import React, { Component, Fragment } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, PolygonLayer } from '@deck.gl/layers';
import Overlay from '../Overlays/Overlay'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import { extent, scaleLinear } from 'd3';
import DelayedPointLayer from './DelayedPointLayer';
import anime from 'animejs'
import GL from '@luma.gl/constants';
import buildingPolygon from '../../muenster_buildings.json'
import { EditableGeoJsonLayer, DrawPolygonMode, ViewMode } from 'nebula.gl';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewState: {
                longitude: 7.615322135118181,
                latitude: 51.96970534849527,
                zoom: 12,
                pitch: 0,
                bearing: 0
            },
            animationProgress: { enterProgress: 0, duration: 60000 },
            animate: false,
            interactionState: {},
            mapBoxToken: 'pk.eyJ1IjoiZXRoaWUxMCIsImEiOiJjazQyeXlxNGcwMjk3M2VvYmw2NHU4MDRvIn0.nYOmVGARhLOULQ550LyUYA',
            accidents: [],
            emptyResult: false,
            aggregation: "Day of week",
            myFeatureCollection: {
                type: 'FeatureCollection',
                features: [{
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [7.464649690877192, 52.03822413785396],
                                [7.764719004628301, 52.03948550952567],
                                [7.772921354890182, 51.85241511574681],
                                [7.468067336819732, 51.85325952504977],
                                [7.464649690877192, 52.03822413785396]
                            ]
                        ]
                    }
                }
                    /* insert features here */
                ]
            },
            showDrawLayer: false
        };

        this._toggleAccidents = this._toggleAccidents.bind(this);
        this._toggleHeatMap = this._toggleHeatMap.bind(this);
        this._toggleBuildings = this._toggleBuildings.bind(this);
        this._confirmFilter = this._confirmFilter.bind(this);
        this._confirmAggregation = this._confirmAggregation.bind(this);
        this._resetFilter = this._resetFilter.bind(this);
        this._playAnimation = this._playAnimation.bind(this);
        this._animate = this._animate.bind(this);
        this._renderLayers = this._renderLayers.bind(this);
        this._handleMapStyle = this._handleMapStyle.bind(this);
        this._toggleDrawPolygon = this._toggleDrawPolygon.bind(this);
        this._getCoordinates = this._getCoordinates.bind(this);
    }

    // fetches all accidents from the server running locally
    componentWillMount() {
        let url = "http://0.0.0.0:9000/hooks/bikes";
        fetch(url)
            .then(response => response.json())
            .then(accidents => this.setState({ accidents }));
    }

    _animate() {
        let that = this;
        // const animation = anime({
        anime({
            duration: that.state.animationProgress.duration,
            targets: that.state.animationProgress,
            enterProgress: 1,
            easing: 'linear',
            begin: function (anim) {
                console.log("begin");
            },
            complete: function (anim) {
                console.log("end");
                that.setState({ animate: false, layers: [], animationProgress: { enterProgress: 0, duration: 10000 } })
            },
            update() {
                // each tick, update the DeckGL layers with new values
                that._updateLayers();
            }
        });
        that._updateLayers();
    }

    _updateLayers() {
        const layers = [];
        const accidentLayer = new DelayedPointLayer({
            id: 'points-layer',
            data: this.state.accidents,
            getPosition: d => [d.lon, d.lat],
            getFillColor: [250, 100, 200],
            getRadius: 10,
            radiusMinPixels: 1,

            // specify how far we are through the animation (value between 0 and 1)
            animationProgress: this.state.animationProgress.enterProgress,

            // specify the delay factor for each point (value between 0 and 1)
            getDelayFactor: (d, index) => {
                var x = scaleLinear().domain([0, this.state.accidents.length]).range([1, 0])(index.index);
                return x
            }
        });
        layers.push(accidentLayer);
        this.setState({
            layers: layers
        })
    }


    _toggleDrawPolygon() {
        this.setState({
            showDrawLayer: !(this.state.showDrawLayer),
            myFeatureCollection: {
                type: 'FeatureCollection',
                features: [
                    /* insert features here */
                ]
            }
        });
        this._renderLayers();
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

    _playAnimation() {
        this.setState(() => {
            return {
                animate: true
            }
        })
        this._animate();
    }

    _getCoordinates() {
        let coordsArr = this.state.myFeatureCollection.features[0].geometry;
        let coordsString = "(";
        if (coordsArr.type === "Polygon") {
            coordsArr.coordinates[0].forEach(element => {
                coordsString = coordsString.concat("(" + element[0] + "," + element[1] + "),");
            });
            coordsString = coordsString.slice(0, coordsString.length - 1);
            coordsString = coordsString.concat(")");
        }
        return coordsString;
    }

    _resetFilter() {
        let url = 'http://0.0.0.0:9000/hooks/bikes';

        fetch(url)
            .then(response => response.json())
            .then(accidents => this.setState({ accidents }));
    }

    _renderLayers() {
        const {
            selectedFeatureIndexes = []
        } = this.props;

        return [
            // This is only needed when using shadow effects
            // returns the 3dbuildings layer
            this.state.showBuildings ?
                new PolygonLayer({
                    id: 'buildings',
                    data: buildingPolygon,
                    extruded: true,
                    wireframe: false,
                    opacity: 1,
                    getPolygon: f => f.polygon,
                    getElevation: f => f.height,
                    getFillColor: [74, 80, 87]
                }) : null,
            this.state.showDrawLayer ?
                new EditableGeoJsonLayer({
                    id: 'geojson-layer',
                    data: this.state.myFeatureCollection,
                    mode: DrawPolygonMode,
                    selectedFeatureIndexes,
                    onEdit: ({ updatedData }) => {
                        console.log(updatedData)
                        this.setState({
                            myFeatureCollection: updatedData,
                            showDrawLayer: false
                        });
                    }
                }) : new EditableGeoJsonLayer({
                    id: 'geojson-layer',
                    data: this.state.myFeatureCollection,
                    mode: ViewMode,
                    selectedFeatureIndexes,
                    getFillColor: [0, 0, 0, 0],
                    onEdit: ({ updatedData }) => {
                        console.log(updatedData)
                        this.setState({
                            myFeatureCollection: updatedData,
                        });
                    }
                }),
            this.state.showAccidentsLayer ?
                new ScatterplotLayer({
                    data: this.state.accidents,
                    id: 'accidentsLayer',
                    getPosition: d => [d.lon, d.lat],
                    getRadius: 5,
                    getFillColor: [255, 0, 0],
                    opacity: 1
                }) : null,
            this.state.showHeatmapLayer ?
                new HeatmapLayer({
                    data: this.state.accidents,
                    id: 'heatmapLayer',
                    pickable: false,
                    getPosition: d => [d.lon, d.lat],
                    getWeight: 1,
                    radiusPixels: 30,
                    intensity: 1,
                    threshold: 0.03
                }) : null
        ]
    };

    _handleMapStyle(e) {
        this.setState({
            mapstyle: e.target.value
        })
    }

    // Uses new filter options and sends new request
    _confirmFilter(filterObject) {

        this.setState({
            filter: filterObject,
        });

        let timeStart = '{00:00:01}';
        let timeEnd = '{23:59:59}';

        let url = 'http://0.0.0.0:9000/hooks/accidents-by-time?years={' + filterObject.years.toString() + '}&months={' + filterObject.months.toString() + '}&weekdays={' + filterObject.days.toString() + '}&polygon=' + this._getCoordinates() + '&hours_start=' + timeStart + '&hours_end=' + timeEnd;

        fetch(url)
            .then(response => response.json())
            .then(accidents => {
                if (accidents.length) {
                    this.setState({
                        accidents: accidents,
                        emptyResult: false
                    });
                } else {
                    this.setState({
                        emptyResult: true
                    })
                }
            })
    }

    _confirmAggregation(aggrStr) {
        this.setState({
            aggregation: aggrStr
        })
    }

    render() {
        return (
            <Fragment>
                <DeckGL
                    initialViewState={this.state.viewState}
                    controller={
                        this.state.showDrawLayer ?
                            { doubleClickZoom: false }
                            : { doubleClickZoom: true }
                    } layers={
                        this.state.animate ?
                            this.state.layers
                            : this._renderLayers()}
                >
                    <StaticMap
                        mapStyle={this.state.mapstyle}
                        mapboxApiAccessToken={this.state.mapBoxToken} />
                </DeckGL>
                <Overlay
                    _animate={this._playAnimation}
                    _toggleBuildings={this._toggleBuildings} 
                    _toggleHeatMap={this._toggleHeatMap}
                    _toggleAccidents={this._toggleAccidents}
                    datalength={this.state.accidents.length}
                    _confirmFilter={this._confirmFilter}
                    _confirmAggregation={this._confirmAggregation}
                    _resetFilter={this._resetFilter}
                    filter={this.state.filter}
                    accidents={this.state.accidents}
                    emptyResult={this.state.emptyResult}
                    aggregation={this.state.aggregation}
                    _getCoordinates={this._getCoordinates}
                    _handleMapStyle = {this._handleMapStyle}
                    _toggleDrawPolygon={this._toggleDrawPolygon}

                />
            </Fragment>
        );
    }
}

export default Map;
