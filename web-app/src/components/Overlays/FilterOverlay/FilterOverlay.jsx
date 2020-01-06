import React, {Component} from 'react';
import {Container,Row,Col,InputGroup,Button,Form} from 'react-bootstrap';
import './FilterOverlay.css'


export default class FilterOverlay extends Component{

    constructor(props){
        super(props)
        this.state = {
            vehicles:["pedestrian","bicycle","small-moped","moped","motorcycle","car","lorry","omnibus","other"],
            weatherconditions:["rainy","sunny","foggy","snow"]
        }
    }

    // Time
    // Type of accident
    // Type of vehicle (pedestrian, bike, car, …)
    // Source of accident
    // Injuries
    // Weather condition
    // Light condition
    

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
                <hr/>
                <Row>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control type="date"></Form.Control>
                            </Col>
                            <Col>
                                <Form.Control type="date"></Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Type of accident"></Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Type of vehicle</Form.Label>
                            <Form.Control as="select">
                                {this.state.vehicles.map((vehicle)=>{
                                    return <option key={vehicle}>{vehicle}</option>
                                })}
                            </Form.Control>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Check type="checkbox" id="checkbox_deaths" label="Deaths"></Form.Check>
                            </Col>
                            <Col>
                                <Form.Check type="checkbox" id="checkbox_seriouslyinjured" label="Seriously Injured"></Form.Check>
                            </Col>
                        </Row>
                        <Row>
                        <Form.Label>Weather conditions</Form.Label>
                            <Form.Control as="select">
                                {this.state.weatherconditions.map((condition)=>{
                                    return <option key={condition}>{condition}</option>
                                })}
                            </Form.Control>
                        </Row>
                    </Form>
                </Row>
                <Row>
                    <Button onClick={this.props._confirmFilter}>Confirm Filter</Button>
                    <Button onClick={this.props._resetFilter}>Reset Filter</Button>
                </Row>


            </Container>
        )
    }

}