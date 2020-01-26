import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ChartOverlay.css";
import BarChart from "../../Charts/BarChart/BarChart";
import AccTypesChart from "../../Charts/AccTypesChart/AccTypesChart";

export default class ChartOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 320,
            height: 200
        };
    }
    componentDidMount() {
        console.log("Component mounted");
    }

    render() {
        return (
            <Container className="chart-panel">
                <h2>Bike accidents</h2>
                <div id="nAccidents" />
                <BarChart
                    accidents={this.props.accidents}
                    width={this.state.width}
                    height={this.state.height}
                    aggregation={this.props.aggregation}
                    id="#nAccidents"
                />
                <span>
                    Number of displayed bike related accidents:
                    {this.props.datalength}
                </span>
                <hr />

                <h2>Accidents summary</h2>
                <div id="accTypes"></div>
                <AccTypesChart
                    accidents={this.props.accidents}
                    width={this.state.width}
                    height={this.state.height}
                    aggregation={this.props.aggregation}
                    id="#accTypes"
                />
            </Container>
        );
    }
}
