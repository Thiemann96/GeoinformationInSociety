import React, { Component } from "react";
import * as d3 from "d3";

export default class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this._getData();
	}

	_getData() {
		let url = "http://0.0.0.0:9000/hooks/bikes";
		fetch(url)
			.then(response => response.json())
			.then(accidents => this.setState({ accidents }))
			.then(() => this.drawChart());
	}

	drawChart() {
		// prepare data
		const data = this.state.accidents
			.map(d => d.time_of_day)
			.filter(d => d !== null)
			.map(d => d.slice(0, 2));
		// nest by hour
		var nested = d3
			.nest()
			.key(d => d)
			.entries(data)
			.map(d => ({ hour: +d.key, count: d.values.length }))
			.sort((a, b) => a.hour > b.hour);
		console.log(data, nested);

		// set chart margins + dimensions
		const margin = { left: 40, right: 0, top: 0, bottom: 15 };
		const dim = {
			height: this.props.height - margin.top - margin.bottom,
			width: this.props.width - margin.left - margin.right
		};

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
		var y = d3
			.scaleLinear()
			.domain([0, d3.max(nested, d => d.count)])
			.range([dim.height, 0]);

		// vertical axis
		g.append("g").call(d3.axisLeft(y));

		g.selectAll("rect")
			.data(nested)
			.enter()
			.append("rect")
			.attr("x", (d, i) => i * (barWidth + barDist))
			.attr("y", (d, i) => y(d.count))
			.attr("width", barWidth)
			.attr("height", (d, i) => y(0) - y(d.count))
			.attr("fill", "steelblue");

		// svg.selectAll("text")
		// 	.data(data)
		// 	.enter()
		// 	.append("text")
		// 	.text(d => d)
		// 	.attr("x", (d, i) => i * (barWidth + barDist) + barWidth / 2)
		// 	.attr("y", (d, i) => this.props.height - 10 * d - 3)
		// 	.attr("text-anchor", "middle");
	}

	render() {
		return <div id={"#" + this.props.id} />;
	}
}
