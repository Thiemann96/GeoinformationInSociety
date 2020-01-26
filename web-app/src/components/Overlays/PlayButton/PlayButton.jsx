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
            <Container className="playButton" fluid>
                    <FaPlay onClick={this.props._playAnimation} style={{ width: '44px', height: '58px' }} />
            </Container>
        )
    }
}
export default PlayButton