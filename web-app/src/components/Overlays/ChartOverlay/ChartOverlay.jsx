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
            height: 200,
            split: "no"
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        console.log("Component mounted");
    }

    onChange(e) {
        this.setState({ split: e.target.value });
        console.log(e.target.value);
    }

    render() {
        const splitOptions = [
            { value: "no", name: "No Split" },
            { value: "temperature_c", name: "Temperature (°C)" },
            { value: "precipitation_mm", name: "Precipitation (mm)" }
        ];

        return (
            <Container className="chart-panel">
                <h2>Bike accidents</h2>

                <span>Split by:</span>
                <select onChange={this.onChange} autocomplete="off">
                    {splitOptions.map((option, index) => {
                        return (
                            <option key={"id" + index} value={option.value}>
                                {option.name}
                            </option>
                        );
                    })}
                </select>
                <br />
                <div id="nAccidents" />
                <BarChart
                    accidents={this.props.accidents}
                    width={this.state.width}
                    height={this.state.height}
                    aggregation={this.props.aggregation}
                    split={this.state.split}
                    id="nAccidents"
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
                    id="accTypes"
                />
            </Container>
        );
    }
}
