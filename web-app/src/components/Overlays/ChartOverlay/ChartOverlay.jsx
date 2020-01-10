import React, {Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import './ChartOverlay.css'
import BarChart from '../../Charts/BarChart/BarChart'
import LineChart from '../../Charts/LineChart/LineChart'

export default class ChartOverlay extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [12, 5, 6, 6, 9, 10],
            width: 320,
            height: 200,
        }
    }

    render(){
        return(
            <Container className="chart-panel">
                <h2>Number of total cyclists:</h2>
                <div id="numbercyclists"/>
                <BarChart data={this.state.data} width={this.state.width} height={this.state.height}/>
                <span>Number of displayed bike related accidents:{this.props.datalength}</span>
                <hr/>
                <h2>Additional graphs can be shown here</h2>
                <div id="linechart"/>
                <LineChart data={this.state.data} width={this.state.width} height={this.state.height}/>
            </Container>
        )
    }

}