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

		const barDist = 2;
		const barWidth =
			(this.props.width - (nested.length - 1) * barDist) / nested.length;
		var barHeight = d3
			.scaleLinear()
			.domain([0, d3.max(nested, d => d.count)])
			.range([0, this.props.height]);

		const svg = d3
			.select("#nAccidents")
			.append("svg")
			.attr("width", this.props.width)
			.attr("height", this.props.height);

		svg.selectAll("rect")
			.data(nested)
			.enter()
			.append("rect")
			.attr("x", (d, i) => i * (barWidth + barDist))
			.attr("y", (d, i) => this.props.height - barHeight(d.count))
			.attr("width", barWidth)
			.attr("height", (d, i) => barHeight(d.count))
			.attr("fill", "green");

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
