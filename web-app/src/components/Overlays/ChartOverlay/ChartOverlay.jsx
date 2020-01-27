import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ChartOverlay.css";
import BarChart from "../../Charts/BarChart/BarChart";
import AccTypesChart from "../../Charts/AccTypesChart/AccTypesChart";
import Collapsible from "react-collapsible"
import CollapsibleBar from "../CollapsibleBar/CollapsibleBar"
export default class ChartOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 320,
            height: 200,
            split: "no",
            open:false
        };
        this.onChange = this.onChange.bind(this);
        this.onCollapseClose = this.onCollapseClose.bind(this);
        this.onCollapseOpen = this.onCollapseOpen.bind(this);
    }
    componentDidMount() {
        console.log("Component mounted");
    }

    onChange(e) {
        this.setState({ split: e.target.value });
        console.log(e.target.value);
    }
    onCollapseClose(){
        this.setState({
            open:false
        })
    }
    onCollapseOpen(){
        this.setState({
            open:true
        })
    }

    render() {
        const splitOptions = [
            { value: "no", name: "No Split" },
            { value: "temperature_c", name: "Temperature (°C)" },
            { value: "precipitation_mm", name: "Precipitation (mm)" }
        ];
        return (
            <Container className="chart-panel">
                <Collapsible onOpen={this.onCollapseOpen} onClose={this.onCollapseClose} trigger={<CollapsibleBar text={this.props.datalength + " Accidents are displayed"} open={this.state.open} />}>
                    <span>Split by:</span>
                    <select onChange={this.onChange} autoComplete="off">
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
                </Collapsible>
            </Container>
        );
    }
}
