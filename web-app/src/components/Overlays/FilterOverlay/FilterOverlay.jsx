import React, {Component} from 'react';
import {Container,Row,Col,Form} from 'react-bootstrap';
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
                <label>Alleinunfall</label><input type="checkbox"></input>
                <label>Verletzte</label><input type="checkbox"></input><br></br>
                <label>Unfalltyp </label><select>
                <option value="rechts">Rechtsabbieger</option>
                <option value="links">Linksabbieger</option>
                <option value="dumm">Autofahrer war zu doof</option>
                <option value="handy">Unachtsamkeit</option>
                </select> <br></br>
               <label>Unfallart(nach Code)</label> <input  type="text"></input>
            </Container>
        )
    }

}