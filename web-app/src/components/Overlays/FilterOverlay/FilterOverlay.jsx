import React, { Component } from "react";
import { Container, Row, Col, InputGroup, Button, Form } from "react-bootstrap";
import "./FilterOverlay.css";

export default class FilterOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [
                "pedestrian",
                "bicycle",
                "small-moped",
                "moped",
                "motorcycle",
                "car",
                "lorry",
                "omnibus",
                "other"
            ],
            weatherconditions: ["rainy", "sunny", "foggy", "snow"]
        };
    }

    render() {
        function Selector(props) {
            return (
                <div id={`select${props.name}`} className="switchContainer">
                    Select {props.name} <br />
                    {props.options.map((opt, i, arr) => {
                        return (
                            <span>
                                <input
                                    type="checkbox"
                                    id={`${props.name}${i}`}
                                    value={`${opt}`}
                                />
                                <label
                                    htmlFor={`${props.name}${i}`}
                                    className={
                                        i === 0
                                            ? "left"
                                            : i === arr.length - 1
                                            ? "right"
                                            : ""
                                    }
                                >
                                    {opt}
                                </label>
                            </span>
                        );
                    })}
                </div>
            );
        }
        return (
            <Container className="filter-panel">
                <Row>
                    <h2>Filter options</h2>
                    <p>Filter the visualised dataset</p>
                </Row>
                <hr />
                <Row>
                    <InputGroup>
                        <label>
                            <InputGroup.Checkbox
                                onChange={this.props._toggleBuildings}
                            ></InputGroup.Checkbox>
                            3D Layer
                        </label>

                        <label>
                            <InputGroup.Checkbox
                                onChange={this.props._toggleAccidents}
                            ></InputGroup.Checkbox>
                            Accident Layer
                        </label>

                        <label>
                            {" "}
                            <InputGroup.Checkbox
                                onChange={this.props._toggleHeatMap}
                            ></InputGroup.Checkbox>
                            Heatmap
                        </label>
                    </InputGroup>
                </Row>
                <hr />
                <Row>
                    <Selector
                        name="Years"
                        options={[2015, 2016, 2017, 2018]}
                    ></Selector>
                </Row>
                <Row>
                    <Selector
                        name="Months"
                        options={[
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec"
                        ]}
                    ></Selector>
                </Row>
                <Row>
                    <Selector
                        name="Days"
                        options={[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun"
                        ]}
                    ></Selector>
                </Row>
                <Row>Select time (slider missing here)</Row>

               
                <Row>
                    <Button onClick={this.props._confirmFilter}>
                        Confirm Filter
                    </Button>
                    <Button onClick={this.props._resetFilter}>
                        Reset Filter
                    </Button>
                </Row>
            </Container>
        );
    }
}
