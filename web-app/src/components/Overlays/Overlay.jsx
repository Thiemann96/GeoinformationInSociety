import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterOverlay from "./FilterOverlay/FilterOverlay";
import ChartOverlay from "./ChartOverlay/ChartOverlay";

export default class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <Container className="control-panel">
                <FilterOverlay _animate={this.props._animate} _resetFilter={this.props._resetFilter} _confirmFilter={this.props._confirmFilter} _toggleHeatMap = {this.props._toggleHeatMap} _toggleAccidents = {this.props._toggleAccidents} _toggleBuildings = {this.props._toggleBuildings} filter = {this.props.filter}/>
                <ChartOverlay   datalength = {this.props.datalength} />

            </Container>
        );
    }
}
