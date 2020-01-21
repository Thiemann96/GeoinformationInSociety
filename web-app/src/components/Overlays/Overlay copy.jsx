import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import FilterOverlay from "./FilterOverlay/FilterOverlay";
import ChartOverlay from "./ChartOverlay/ChartOverlay";

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
                               _toggleDrawPolygon = {this.props._toggleDrawPolygon}
                               _handleMapStyle={this.props._handleMapStyle}
                               />

                <ChartOverlay datalength={this.props.datalength} accidents={this.props.accidents}
                              aggregation={this.props.aggregation}
                              />

            </Container>
        );
    }
}
