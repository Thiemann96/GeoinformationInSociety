import React, {Component} from 'react';
import {Container,Row,Col,InputGroup} from 'react-bootstrap';
import './FilterOverlay.css'


export default class FilterOverlay extends Component{

    constructor(props){
        super(props)
        this.state = {
        }
    }



    render(){
        return(
            <Container className="filter-panel">
                <Row>
                <h2>Filter options</h2>
                <p>Filter the visualised dataset</p>
                </Row>
                <hr/>
                <Row>
                    <InputGroup>
                        <label>3D Layer</label><InputGroup.Checkbox onChange={this.props._toggleBuildings}></InputGroup.Checkbox>
                        <label>Accident Layer</label><InputGroup.Checkbox onChange={this.props._toggleAccidents}></InputGroup.Checkbox>
                        <label>Heatmap</label><InputGroup.Checkbox onChange={this.props._toggleHeatMap}></InputGroup.Checkbox>
                    </InputGroup>
                </Row>


            </Container>
        )
    }

}