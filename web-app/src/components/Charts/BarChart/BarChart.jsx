import React, { Component } from "react";
import * as d3 from "d3";
import "./BarChart.css";

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    drawChart() {
        // console.log(this.props.accidents);

        const accidents = this.props.accidents;

        let aggregateBy = this.props.aggregation;
        let splitBy = this.props.split;

        // aggregation
        switch (aggregateBy) {
            // case "Year": default, see below
            case "Month":
                var data = this.props.accidents.filter(d => d.date !== null);
                // nest by month
                var nested = d3
                    .nest()
                    .key(d => d.date.slice(5, 7))
                    .entries(data)
                    .sort((a, b) => +a.key > +b.key);
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
                break;
            default:
                // year
                var data = this.props.accidents.filter(d => d.date !== null);
                // nest by year
                var nested = d3
                    .nest()
                    .key(d => d.date.slice(0, 4))
                    .entries(data)
                    .sort((a, b) => +a.key > +b.key);
                break;
        }

        const splitKeys = {
            // colours: grey, blue, orange
            precipitation_mm: ["unknown", "precipitation", "no precipitation"],
            temperature_c: ["unknown", "not freezing", "freezing"],
            no: ["all"]
        };

        const splitKeyGenerator = {
            precipitation_mm: d =>
                d.weather
                    ? d.weather.precipitation_mm > 0
                        ? "precipitation"
                        : "no precipitation"
                    : "unknown",
            temperature_c: d =>
                d.weather
                    ? d.weather.temperature_c > 0
                        ? "not freezing"
                        : "freezing"
                    : "unknown",
            no: d => "all"
        };

        var barStack = d3.stack().keys(splitKeys[splitBy])(
            nested.map(function(dat) {
                var n = d3
                    .nest()
                    .key(splitKeyGenerator[splitBy])
                    .entries(dat.values)
                    .sort((a, b) => a.key > b.key);
                var obj = { key: dat.key };
                splitKeys[splitBy].forEach(function(key) {
                    obj[key] = 0
                })
                for (var i = 0; i < splitKeys[splitBy].length; i++) {
                    obj[n[i].key] = n[i].values.length;
                }
                return obj;
            })
        );

        // end of data preprocessing
        // barStack is the data we are going to use to draw the chart
        /////////////////////////////////////////////////////////////

        // Delete old charts if existing
        let chartDiv = d3.select("#" + this.props.id);
        chartDiv.html("");

        // set chart margins + dimensions
        const margin = { left: 40, right: 0, top: 10, bottom: 20 };
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
        g.append("g").attr("transform", "translate(-3,0)").call(d3.axisLeft(y));
        g.append("g")
            .attr("transform", "translate(0," + (dim.height + 2) + ")")
            .call(
                d3
                    .axisBottom(x)
                    .tickFormat(i => nested[i].key)
                    .ticks(10)
                    .tickSizeOuter(0)
            );

        var bar = g
            .selectAll(".bargroup")
            .data(barStack)
            .enter()
            .append("g")
            .classed("bargroup", true)
            .attr("id", (d, i) => "bargroup" + i);

        bar.selectAll("rect")
            .data(d => d)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * (barWidth + barDist))
            .attr("y", (d, i) => y(d[1]))
            .attr("width", barWidth)
            .attr("height", (d, i) => y(d[0]) - y(d[1]));

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
