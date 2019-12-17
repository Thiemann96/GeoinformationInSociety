import React, { Component } from "react";
import * as d3 from "d3";

export default class BarChart extends Component {
	componentDidMount() {
		this.drawChart();
	}
	drawChart() {
		const data = [12, 5, 6, 6, 9, 10];

		const barDist = 10;
		const barWidth =
			(this.props.width - (data.length - 1) * barDist) / data.length;

		const svg = d3
			.select("#numbercyclists")
			.append("svg")
			.attr("width", this.props.width)
			.attr("height", this.props.height)
			.style("margin-left", 100);

		svg
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", (d, i) => i * (barWidth + barDist))
			.attr("y", (d, i) => this.props.height - 10 * d)
			.attr("width", barWidth)
			.attr("height", (d, i) => d * 10)
			.attr("fill", "green");

		svg
			.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(d => d)
			.attr("x", (d, i) => i * (barWidth + barDist) + barWidth / 2)
			.attr("y", (d, i) => this.props.height - 10 * d - 3)
			.attr("text-anchor", "middle");
	}

	render() {
		return <div id={"#" + this.props.id} />;
	}
}
