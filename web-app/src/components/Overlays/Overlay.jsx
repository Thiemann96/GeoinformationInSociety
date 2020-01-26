import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterOverlay from "./FilterOverlay/FilterOverlay";
import ChartOverlay from "./ChartOverlay/ChartOverlay";
import TileSelect from "./TileSelect/TileSelect";
import DrawingTool from "./DrawingTool/DrawingTool"
import Disclaimer from "./Disclaimer/Disclaimer";

export default class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <Container className="control-panel">
                <FilterOverlay _animate={this.props._animate} _resetFilter={this.props._resetFilter}
                    _confirmFilter={this.props._confirmFilter} _toggleHeatMap={this.props._toggleHeatMap}
                    _toggleAccidents={this.props._toggleAccidents}
                    _toggleBuildings={this.props._toggleBuildings} filter={this.props.filter}
                    emptyResult={this.props.emptyResult} _confirmAggregation={this.props._confirmAggregation}
                    _toggleDrawPolygon={this.props._toggleDrawPolygon} _showOnlyInjury={this.props._showOnlyInjury}
                    _onChangeTimeFrom = {this.props._onChangeTimeFrom}
                    _onChangeTimeTo= {this.props._onChangeTimeTo}
                    _toggleTimeFilter = {this.props._toggleTimeFilter}
                />

                <ChartOverlay datalength={this.props.datalength} accidents={this.props.accidents}
                    aggregation={this.props.aggregation}
                />
                <DrawingTool _toggleDrawPolygon={this.props._toggleDrawPolygon}/>
                <TileSelect _handleMapStyle={this.props._handleMapStyle}
                />
                <Disclaimer accidentsNoCoords={this.props.accidentsNoCoords}/>
            </Container>
        );
    }
}
