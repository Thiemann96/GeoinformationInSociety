import React, { Component } from "react";
import { Container, Row, Col, InputGroup, Button, Form } from "react-bootstrap";
import "./FilterOverlay.css";

var filterObject = 
    {
        days:[],
        months:[],
        years:[]
    }

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
            weatherconditions: ["rainy", "sunny", "foggy", "snow"],

        };
        this._handleDays = this._handleDays.bind(this);
        this._handleMonths = this._handleMonths.bind(this);
        this._handleYears = this._handleYears.bind(this);
    }

    _handleMonths(e){
        // check if clicked months is already in the array
        let bool = filterObject.months.includes(e.target.value)
        bool ? // contains item
                filterObject.months = filterObject.months.filter(month=> month !== e.target.value)
             :  // doesnt contain
                filterObject.months.push(e.target.value);
    }
    _handleDays(e){
        // check if clicked months is already in the array
        let bool = filterObject.days.includes(e.target.value)
        bool ? // contains item
                filterObject.days = filterObject.days.filter(day=> day !== e.target.value)
             :  // doesnt contain
                filterObject.days.push(e.target.value);
            }
    _handleYears(e){
        // check if clicked months is already in the array
        let bool = filterObject.years.includes(e.target.value)
        bool ? // contains item
                filterObject.years = filterObject.years.filter(year=> year !== e.target.value)
             :  // doesnt contain
                filterObject.years.push(e.target.value);    }
    render() {
        function Selector(props) {
            return (
                <div id={`select${props.name}`} className="switchContainer">
                    Select {props.name} <br />
                    {props.options.map((opt, i, arr) => {
                        return (
                            <span style={{backgroundColor:'red'}}>
                                <input
                                    type="checkbox"
                                    id={`${props.name}${i}`}
                                    value={`${opt}`}
                                    onChange = {props.onChange}
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
                        <Button onClick={this.props._animate}>Play animation</Button>
                    </InputGroup>
                </Row>
                <hr />
                <Row>
                    <Selector
                        name="Years"
                        options={[2015, 2016, 2017, 2018]}
                        onChange = {this._handleYears}
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
                        onChange = {this._handleMonths}
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
                        onChange = {this._handleDays}
                    ></Selector>
                </Row>
                <Row>Select time (slider missing here)</Row>

               
                <Row>
                    <Button onClick={()=>this.props._confirmFilter(filterObject)}>
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
