import React,{Component} from 'react';
import * as d3 from "d3";

class LineChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                {date: new Date(2007, 3, 24), value: 4},
                {date: new Date(2007, 3, 25), value: 20.35},
                {date: new Date(2007, 3, 26), value: 30.84},
                {date: new Date(2007, 3, 27), value: 50.92},
                {date: new Date(2007, 3, 30), value: 40.80},
                {date: new Date(2007, 4,  1), value: 30.47},
            ]
        }
    }

    componentDidMount() {
      this.drawChart();
    }


    drawChart() {
        const svg = d3.select("#linechart")
        .append("svg")
        .attr("width", this.props.width)
        .attr("height", this.props.height)
        .style("margin-left", 100);

        var x = d3.scaleTime()
        .domain(d3.extent(this.state.data, function(d) { return d.date; }))
        .range([ 0, this.props.width ]);
      svg.append("g")
        .attr("transform", "translate(0," + this.props.height + ")")
        .call(d3.axisBottom(x));

         // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(this.state.data, function(d) { return +d.value; })])
        .range([ this.props.height, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y));

          // Add the line
    svg.append("path")
    .datum(this.state.data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.value) })
      )

    }

          
    render(){
      return <div id={"#" + this.props.id}></div>
    }
  }
      
  export default LineChart;
  
  