import React, { Component } from 'react';
import './DrawingTool.css'
import {Container} from "react-bootstrap"
import {FaPen} from "react-icons/fa";
class DrawingTool extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        this._onClick = this._onClick.bind(this);
    }
    _onClick(){
        this.props._toggleDrawPolygon()
    }
    render(){
        return(
            <Container className="menuBar drawingTool" fluid>
                 <FaPen onClick={this._onClick} style={{ width: '44px', height: '58px' }} />
            </Container>        
        )}
}

export default DrawingTool