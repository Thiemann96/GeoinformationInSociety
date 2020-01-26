import React, { Component } from "react";
import * as d3 from "d3";
import categories from "../../../data/accident_category.json";

export default class AccTypesChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.drawChart();
    }

    drawChart() {
        // console.log(categories.data);

        // prepare data
        // reduce to array of categories + filter NAs
        var data = this.props.accidents
            .map(d => d.accident_category)
            .filter(d => d !== null);

        // nest by category
        var nested = d3
            .nest()
            .key(d => d)
            .entries(data)
            .map(d => ({ bin: +d.key, count: d.values.length }))
            .sort((a, b) => a.bin > b.bin);
        console.log(nested);

        // set chart margins + dimensions
        const margin = { left: 40, right: 0, top: 0, bottom: 20 };
        const dim = {
            height: this.props.height - margin.top - margin.bottom,
            width: this.props.width - margin.left - margin.right
        };

        // Delete old charts if existing
        let chartDiv = d3.select(this.props.id);
        chartDiv.html("");

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
            .domain([0, d3.max(nested, d => d.count)])
            .range([dim.height, 0]);

        // axes
        g.append("g").call(d3.axisLeft(y));
        g.append("g")
            .attr("transform", "translate(0," + dim.height + ")")
            .call(
                d3
                    .axisBottom(x)
                    .tickFormat(i => nested[i].bin)
                    .tickSizeOuter(0)
            );

        g.selectAll("rect")
            .data(nested)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * (barWidth + barDist))
            .attr("y", (d, i) => y(d.count))
            .attr("width", barWidth)
            .attr("height", (d, i) => y(0) - y(d.count))
            .attr("fill", "steelblue");

        chartDiv.append("div").html(
            "<b>Unfalltypen:</b><br>" +
                nested
                    .map(function(d) {
                        return d.bin + ": " + getCategory(d.bin) + "<br>";
                    })
                    .join("")
        );

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

        function getCategory(key) {
            // translate number key into written category name
            var i = categories.data.findIndex(d => d.key == key);
            return categories.data[i].title;
        }
    }

    render() {
        if (this.props.accidents && this.props.aggregation) this.drawChart();
        return <div id={"#" + this.props.id} />;
    }
}
