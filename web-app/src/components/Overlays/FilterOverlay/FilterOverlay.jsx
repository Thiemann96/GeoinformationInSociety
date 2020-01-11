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
                    <div id="selectMonths" className="switchContainer">
                        <input type="checkbox" id="monthJan" value="Jan" />
                        <label htmlFor="monthJan" className="left">
                            Jan
                        </label>
                        <input type="checkbox" id="monthFeb" value="Feb" />
                        <label htmlFor="monthFeb">Feb</label>
                        <input type="checkbox" id="monthMar" value="Mar" />
                        <label htmlFor="monthMar">Mar</label>
                        <input type="checkbox" id="monthApr" value="Apr" />
                        <label htmlFor="monthApr">Apr</label>
                        <input type="checkbox" id="monthMay" value="May" />
                        <label htmlFor="monthMay">May</label>
                        <input type="checkbox" id="monthJun" value="Jun" />
                        <label htmlFor="monthJun">Jun</label>
                        <input type="checkbox" id="monthJul" value="Jul" />
                        <label htmlFor="monthJul">Jul</label>
                        <input type="checkbox" id="monthAug" value="Aug" />
                        <label htmlFor="monthAug">Aug</label>
                        <input type="checkbox" id="monthSep" value="Sep" />
                        <label htmlFor="monthSep">Sep</label>
                        <input type="checkbox" id="monthOct" value="Oct" />
                        <label htmlFor="monthOct">Oct</label>
                        <input type="checkbox" id="monthNov" value="Nov" />
                        <label htmlFor="monthNov">Nov</label>
                        <input type="checkbox" id="monthDec" value="Dec" />
                        <label htmlFor="monthDec" className="right">
                            Dec
                        </label>
                    </div>
                </Row>
                {/* 
                <Row>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label>From</Form.Label>
                                <Form.Control type="date"></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>To</Form.Label>
                                <Form.Control type="date"></Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Type of accident</Form.Label>
                                <Form.Control></Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Type of vehicle</Form.Label>
                            <Form.Control as="select">
                                {this.state.vehicles.map(vehicle => {
                                    return (
                                        <option key={vehicle}>{vehicle}</option>
                                    );
                                })}
                            </Form.Control>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    id="checkbox_deaths"
                                    label="Deaths"
                                ></Form.Check>
                            </Col>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    id="checkbox_seriouslyinjured"
                                    label="Seriously Injured"
                                ></Form.Check>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Weather conditions</Form.Label>
                            <Form.Control as="select">
                                {this.state.weatherconditions.map(condition => {
                                    return (
                                        <option key={condition}>
                                            {condition}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                        </Row>
                    </Form>
                </Row>
                */}
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
