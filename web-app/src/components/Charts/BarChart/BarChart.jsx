import React, {Component} from "react";
import * as d3 from "d3";

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.drawChart();
    }



        // prepare data
        switch (aggregateBy) {
            case "Year":
                var data = this.props.accidents
                    .map(d => d.date)
                    .filter(d => d !== null)
                    .map(d => d.slice(0, 4));
                // nest by year
                var nested = d3
                    .nest()
                    .key(d => d)
                    .entries(data)
                    .map(d => ({bin: +d.key, count: d.values.length}))
                    .sort((a, b) => a.bin > b.bin);
                console.log(data, nested);
                break;
            case "Day of week":
                var data = this.props.accidents
                    .map(d => d.date)
                    .filter(d => d !== null)
                    .map(getDay);
                // nest by day
                var nested = d3
                    .nest()
                    .key(d => d)
                    .entries(data)
                    .map(d => ({bin: d.key, count: d.values.length}))
                    .sort((a, b) => sortByWeekday(a.bin, b.bin));
                break;
            case "Hour of day":
                var data = this.props.accidents
                    .map(d => d.time_of_day)
                    .filter(d => d !== null)
                    .map(d => d.slice(0, 2));
                // nest by hour
                var nested = d3
                    .nest()
                    .key(d => d)
                    .entries(data)
                    .map(d => ({bin: +d.key, count: d.values.length}))
                    .sort((a, b) => a.bin > b.bin);
                console.log(data, nested);
                break;
            default:
                console.log("invalid option");
            // code block
        }


        // Delete old charts if existing
        let chartDiv  = document.getElementById('nAccidents');
        if(chartDiv){
            chartDiv.innerHTML = '';
        }

        // create svg
        const svg = d3
            .select("#nAccidents")
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
        if (this.props.accidents && this.props.aggregation)
            this.drawChart();
        return <div id={"#" + this.props.id}/>;
    }
}
