import React, {Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import FilterOverlay from './FilterOverlay/FilterOverlay'
import ChartOverlay from './ChartOverlay/ChartOverlay'

export default class Overlay extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render(){
        return(
            <Container className="control-panel">
                <FilterOverlay/>
                <ChartOverlay/>
            </Container>
        )
    }

}