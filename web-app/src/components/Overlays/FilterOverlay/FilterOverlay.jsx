import React, {Component} from "react";
import {Container, Row, Col, InputGroup, Button, Form} from "react-bootstrap";
import "./FilterOverlay.css";
import TimeSlider from "../../TimeSlider/TimeSlider";

//prettier-ignore
let filterObject = {
    days: ["1", "2", "3", "4", "5", "6", "7"],
    months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    years: ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"]
};

let chartAggregation = "Day of week";

export default class FilterOverlay extends Component {
    constructor(props) {
        super(props);
        //prettier-ignore
        this.state = {
            activeTimeLayer:false,
            options: [
                {value: 'mapbox://styles/mapbox/dark-v10', label: 'Dark'},
                {value: 'mapbox://styles/mapbox/streets-v11', label: 'Streets'},
                {value: 'mapbox://styles/mapbox/outdoors-v11', label: 'Outdoors'},
                {value: 'mapbox://styles/mapbox/light-v10', label: 'Light'},
                {value: 'mapbox://styles/mapbox/satellite-v9', label: 'Satellite'},
                {value: 'mapbox://styles/mapbox/satellite-streets-v11', label: 'Satellite Streets'},
                {value: 'mapbox://styles/mapbox/navigation-preview-day-v4', label: 'Navigation night'},
                {value: 'mapbox://styles/mapbox/navigation-preview-night-v4', label: 'Navigation day'},
                {value: 'mapbox://styles/mapbox/navigation-guidance-day-v4', label: 'Navigation Guidance Day'},
                {value: 'mapbox://styles/mapbox/navigation-guidance-night-v4', label: 'Navigation Guidance Night'},
            ]
        };
        this.props.filter
            ? (filterObject = this.props.filter)
            : console.log("No filters set");
        this._handleDays = this._handleDays.bind(this);
        this._handleMonths = this._handleMonths.bind(this);
        this._handleYears = this._handleYears.bind(this);
        this._handleAggregation = this._handleAggregation.bind(this);
        this._handleCheckbox = this._handleCheckbox.bind(this);

    }

    _handleMonths(e) {
        // check if clicked months is already in the array
        let bool = filterObject.months.includes(e.target.value);
        bool // contains item
            ? (filterObject.months = filterObject.months.filter(
                  month => month !== e.target.value
              ))


            : // doesnt contain
              filterObject.months.push(e.target.value);
    }

    _handleDays(e) {
        // check if clicked months is already in the array
        let bool = filterObject.days.includes(e.target.value);
        bool // contains item
            ? (filterObject.days = filterObject.days.filter(
                  day => day !== e.target.value
              ))
            : // doesnt contain
              filterObject.days.push(e.target.value);
    }

    _handleYears(e) {
        // check if clicked months is already in the array
        let bool = filterObject.years.includes(e.target.value);
        bool // contains item
            ? (filterObject.years = filterObject.years.filter(
                  year => year !== e.target.value
              ))
            : // doesnt contain
              filterObject.years.push(e.target.value);
    }

    _handleAggregation(e) {
        chartAggregation = e.target.value;
        this.props._confirmAggregation(chartAggregation);
    }

    _resetFilter() {
        filterObject = {
            days: ["1", "2", "3", "4", "5", "6", "7"],
            months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            years: ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"]
        };
    }
    _handleCheckbox(e){
        this.props._toggleTimeFilter(e);
        console.log(e.target.checked)
        this.setState({
            activeTimeLayer:e.target.checked
        })
    }

    render() {
        function Selector(props) {
            return (
                <div id={`select${props.name}`} className="switchContainer">
                    Select {props.name} <br/>
                    {props.options.map((opt, i, arr) => {
                        let checked = false;
                        if (
                            filterObject.years.includes(opt.val) ||
                            filterObject.months.includes(opt.val) ||
                            filterObject.days.includes(opt.val)
                        ) {
                            checked = true;
                        }
                        if (
                            props.name === "Aggregation" &&
                            chartAggregation === opt.val
                        ) {
                            checked = true;
                        }
                        return (
                            <span key={"key" + i}>
                                <input
                                    type={props.inputtype}
                                    id={`${props.name}${i}`}
                                    name={props.name}
                                    value={`${opt.val}`}
                                    onChange={props.onChange}
                                    defaultChecked={checked}
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
                                    {opt.name}
                                </label>
                            </span>
                        );
                    })}
                </div>
            );
        }

        function EmptyResultMessage(props) {
            let pStyle = {
                color: "red"
            };
            if (props.emptyResult === true) {
                return (
                    <p style={pStyle}>
                        The filters you set lead to an empty result.
                        <br />
                        Please change your filters.
                    </p>
                );
            }
            return <p />;
        }

        return (
            <Container className="filter-panel">
                <Row>
                    <h2>Filter options</h2>
                    <p>Filter the visualised dataset</p>
                    <EmptyResultMessage emptyResult={this.props.emptyResult}/>
                </Row>
                <hr/>
                <Row>
                    <InputGroup>
                        <label>
                            <InputGroup.Checkbox
                                onChange={this.props._toggleBuildings}
                            />
                            3D Layer
                        </label>
                        <label>
                            <InputGroup.Checkbox
                                onChange={this.props._toggleAccidents}
                            />
                            Accident Layer
                        </label>
                        <label>
                            {" "}
                            <InputGroup.Checkbox
                                onChange={this.props._toggleHeatMap}
                            />
                            Heatmap
                        </label>
                        <br/>
                        <label>
                            <InputGroup.Checkbox
                                onChange={this.props._showOnlyInjury}
                            />
                            Show only accidents with personal injuries
                        </label>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup>
                        <Button onClick={this.props._toggleDrawPolygon}>
                            Set BBox
                        </Button>
                        <Button onClick={this.props._animate}>
                            Play animation
                        </Button>
                    </InputGroup>
                </Row>
                <hr/>
                <Row>
                    <Selector
                        name="Years"
                        inputtype="checkbox"
                        options={[
                            {name: "2007", val: "2007"},
                            {name: "2008", val: "2008"},
                            {name: "2009", val: "2009"},
                            {name: "2010", val: "2010"},
                            {name: "2011", val: "2011"},
                            {name: "2012", val: "2012"},
                            {name: "2013", val: "2013"},
                            {name: "2014", val: "2014"},
                            {name: "2015", val: "2015"},
                            {name: "2016", val: "2016"},
                            {name: "2017", val: "2017"},
                            {name: "2018", val: "2018"}
                        ]}
                        onChange={this._handleYears}
                    />
                </Row>
                <Row>
                    <Selector
                        name="Months"
                        inputtype="checkbox"
                        options={[
                            { name: "Jan", val: "01" },
                            { name: "Feb", val: "02" },
                            { name: "Mar", val: "03" },
                            { name: "Apr", val: "04" },
                            { name: "May", val: "05" },
                            { name: "Jun", val: "06" },
                            { name: "Jul", val: "07" },
                            { name: "Aug", val: "08" },
                            { name: "Sep", val: "09" },
                            { name: "Oct", val: "10" },
                            { name: "Nov", val: "11" },
                            { name: "Dec", val: "12" }
                        ]}
                        onChange={this._handleMonths}
                    />
                </Row>
                <Row>
                    <Selector
                        name="Days"
                        inputtype="checkbox"
                        options={[
                            {name: "Mon", val: "1"},
                            {name: "Tue", val: "2"},
                            {name: "Wed", val: "3"},
                            {name: "Thu", val: "4"},
                            {name: "Fri", val: "5"},
                            {name: "Sat", val: "6"},
                            {name: "Sun", val: "7"}
                        ]}
                        onChange={this._handleDays}
                    />
                </Row>
                <Row>
                    Select time <div id="timeslider"></div>
                    <TimeSlider min="0" max="1440" id="#timeslider" />
                   
                </Row>

                <Row>
                    <Button
                        onClick={() => this.props._confirmFilter(filterObject)}
                    >
                        Confirm Filter
                    </Button>
                    <Button onClick={() => {
                        this.props._resetFilter();
                        this._resetFilter();
                    }}>
                        Reset Filter
                    </Button>
                </Row>
                <hr/>
                <Row>
                    <Selector
                        name="Aggregation"
                        inputtype="radio"
                        options={[
                            {name: "Year", val: "Year"},
                            {name: "Month", val: "Month"},
                            {name: "Day of week", val: "Day of week"},
                            {name: "Hour of day", val: "Hour of day"},
                        ]}
                        onChange={this._handleAggregation}
                    />
                </Row>
            </Container>
        );
    }
}
