import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import "./ChartOverlay.css";
import BarChart from "../../Charts/BarChart/BarChart";
import LineChart from "../../Charts/LineChart/LineChart";

export default class ChartOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 320,
            height: 200
        };
    }

    render() {
        return (
            <Container className="chart-panel">
                <h2>Bike accidents</h2>
                <div id="nAccidents"/>
                <BarChart
                    accidents={this.props.accidents}
                    width={this.state.width}
                    height={this.state.height}
                    aggregation={this.props.aggregation}
                />
                <span>
                    Number of displayed bike related accidents:
                    {this.props.datalength}
                </span>
                <hr/>
                <h2>Additional graphs can be shown here</h2>
                <div id="linechart"/>
                <LineChart
                    accidents={this.props.accidents}
                    width={this.state.width}
                    height={this.state.height}
                />
            </Container>
        );
    }
}
