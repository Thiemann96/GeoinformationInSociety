import React, { Component } from 'react'
import Collapsible from 'react-collapsible';
import {FaArrowDown,FaArrowUp} from "react-icons/fa";
import "./CollapsibleBar.css"
class CollapsibleBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
               mouseEnter:false  
        }
        this._mouseEnter = this._mouseEnter.bind(this);
        this._mouseLeave = this._mouseLeave.bind(this);
    }

    _mouseEnter(){
        this.setState({
            mouseEnter:true
        })
    }
    _mouseLeave(){
        this.setState({
            mouseEnter:false
        })
    
    }
    render() {
        return (
            <div onMouseEnter= {this._mouseEnter} onMouseLeave={this._mouseLeave} style={this.state.mouseEnter?{"backgroundColor":"#E6E6E6"}:null} className="collapsbar">
              {this.props.text}  {this.props.open?<FaArrowUp/>:<FaArrowDown/>}
            </div>
        )
    }
}

export default CollapsibleBar

