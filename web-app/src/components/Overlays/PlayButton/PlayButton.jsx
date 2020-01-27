import React, { Component } from 'react';
import './PlayButton.css'
import {FaPlay} from "react-icons/fa"
import {Container} from "react-bootstrap"

class PlayButton extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        console.log("mounted")
    }
    render(){
        return(
            <Container className="menuBar playButton" fluid>
                    <FaPlay onClick={this.props._playAnimation} style={{width: '20px', height: '34px' }} />
            </Container>
        )
    }
}
export default PlayButton