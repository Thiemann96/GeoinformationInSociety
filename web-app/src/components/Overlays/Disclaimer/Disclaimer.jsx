import React, {Component} from "react";
import {Container, Row, Col, InputGroup, Button, Form} from "react-bootstrap";
import "./Disclaimer.css";

export default class Disclaimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this._handleCollapse = this._handleCollapse.bind(this);
    }

    _handleCollapse(e) {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        function CollapseMessage(props) {
            return <div>
                <h2>
                    Missing data on map:
                </h2>
                <p>
                    It is not possible to show all accidents on the map because of missing coordinates for those
                    accidents.
                    <br/>
                    <strong>
                        The number of missing accidents on the map is: {props.accidentsNumber}
                    </strong>
                </p>
                <hr/>
                <h2>
                    Data source:
                </h2>
                <p>
                    The data used for this application comes from <a href="https://codeformuenster.org/">Code for Muenster</a>.
                    <br/>
                    Link to the data: <a href="https://github.com/codeformuenster/verkehrsunfaelle">GitHub</a>
                </p>
            </div>
        }

        return (
            <Container className="disclaimer-panel">
                <p className={"short"} onClick={this._handleCollapse}>
                    Not all data shown on map because of missing coordinates. Data from CodeForMuenster
                </p>
                <div className={"collapse" + (this.state.open ? ' in' : '')}>
                    <CollapseMessage accidentsNumber={this.props.accidentsNoCoords}/>
                </div>
            </Container>
        );
    }
}
