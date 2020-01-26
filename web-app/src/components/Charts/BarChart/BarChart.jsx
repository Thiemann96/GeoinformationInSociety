import React, { Component } from "react";
import * as d3 from "d3";

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.drawChart();
    }

    drawChart() {
        console.log(this.props.accidents);

        const accidents = this.props.accidents;
        // this should be set dynamically:#
        /* TODO:
            aggregate by this.props.aggregation
            Getting 'undefined' error at the moment while changing aggregation if filters are set
         */
        let aggregateBy = this.props.aggregation;
        // const aggregateBy = "hour_of_day";
        // const aggregateBy = "Year";

        // prepare data
        switch (aggregateBy) {
            case "Year":
                var data = this.props.accidents.filter(d => d.date !== null);
                // nest by year
                var nested = d3
                    .nest()
                    .key(d => d.date.slice(0, 4))
                    .entries(data)
                    .sort((a, b) => +a.key > +b.key);
                console.log(data, nested);
                break;
            case "Month":
                var data = this.props.accidents.filter(d => d.date !== null);
                // nest by month
                var nested = d3
                    .nest()
                    .key(d => d.date.slice(5, 7))
                    .entries(data)
                    .sort((a, b) => +a.key > +b.key);
                console.log(data, nested);
                break;
            case "Day of week":
                var data = this.props.accidents.filter(d => d.date !== null);
                // nest by day
                var nested = d3
                    .nest()
                    .key(d => getDay(d.date))
                    .entries(data)
                    .sort((a, b) => sortByWeekday(a.key, b.key));
                break;
            case "Hour of day":
                var data = this.props.accidents.filter(
                    d => d.time_of_day !== null
                );
                // nest by hour
                var nested = d3
                    .nest()
                    .key(d => d.time_of_day.slice(0, 2))
                    .entries(data)
                    .sort((a, b) => +a.key > +b.key);
                console.log(data, nested);
                break;
            default:
                console.log("invalid option");
        }

        // Delete old charts if existing
        let chartDiv = d3.select(this.props.id);
        chartDiv.html("");

        // create dropdown
        const splitOptions = [
            { value: "no", name: "No Split" },
            { value: "temperature_c", name: "Temperature (°C)" },
            { value: "precipitation_mm", name: "Precipitation (mm)" }
        ];

        const dropdownDiv = chartDiv.append("div");
        dropdownDiv.append("span").html("Split by: ");
        const dropdown = dropdownDiv.append("select");
        dropdown
            .selectAll(".splitOption")
            .data(splitOptions)
            .enter()
            .append("option")
            .classed("splitOption", true)
            .attr("value", d => d.value)
            .text(d => d.name);
        dropdown.on("change", function() {
            console.log(this.value);

            if (this.value == "precipitation_mm") {
                var data2 = accidents.filter(d => d.date !== null);
                var data2 = d3
                    .nest()
                    .key(d => getDay(d.date))
                    .key(d =>
                        d.weather
                            ? d.weather.precipitation_mm > 0
                                ? "rain"
                                : "no rain"
                            : "unknown"
                    )
                    .entries(data2);
                // .nest()
                // .key(d => getDay(d.date))
                // .key(d => d.values.weather.precipitation_mm > 0)
                // .entries(data2);

                console.log(data2);
            }
        });

        // set chart margins + dimensions
        const margin = { left: 40, right: 0, top: 0, bottom: 20 };
        const dim = {
            height: this.props.height - margin.top - margin.bottom,
            width: this.props.width - margin.left - margin.right
        };

        // create svg
        const svg = chartDiv
            .append("svg")
            .attr("width", this.props.width)
            .attr("height", this.props.height);

        // g element for bars
        const g = svg
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        // calculate bar dimensions + scaling
        const barDist = 2;
        const barWidth =
            (dim.width - (nested.length - 1) * barDist) / nested.length;
        let x = d3
            .scaleBand()
            .domain(d3.range(nested.length))
            .range([0, dim.width])
            .padding(0.1);
        let y = d3
            .scaleLinear()
            .domain([0, d3.max(nested, d => d.values.length)])
            .range([dim.height, 0]);

        // axes
        g.append("g").call(d3.axisLeft(y));
        g.append("g")
            .attr("transform", "translate(0," + dim.height + ")")
            .call(
                d3
                    .axisBottom(x)
                    .tickFormat(i => nested[i].key)
                    .tickSizeOuter(0)
            );

        g.selectAll("rect")
            .data(nested)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * (barWidth + barDist))
            .attr("y", (d, i) => y(d.values.length))
            .attr("width", barWidth)
            .attr("height", (d, i) => y(0) - y(d.values.length))
            .attr("fill", "steelblue");

        function getDay(str) {
            // takes string of format "2017-12-19" and returns day of the week
            let parser = d3.timeParse("%Y-%m-%d");
            let formatter = d3.timeFormat("%a"); // abbreviated day of week
            return formatter(parser(str));
        }

        function sortByWeekday(a, b) {
            let ordering = {}, // map for efficient lookup of sortIndex
                sortOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            for (let i = 0; i < sortOrder.length; i++)
                ordering[sortOrder[i]] = i;

            return ordering[a] - ordering[b];
        }
    }

    render() {
        if (this.props.accidents && this.props.aggregation) this.drawChart();
        return <div id={"#" + this.props.id} />;
    }
}
