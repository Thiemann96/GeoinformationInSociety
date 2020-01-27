import React from 'react'
import './TileSelect.css'
import { IoLogoBuffer } from "react-icons/io";
import { Container, Row, Col, Form } from 'react-bootstrap';

class TileSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                { value: 'mapbox://styles/mapbox/streets-v11', label: 'Streets' },
                { value: 'mapbox://styles/mapbox/outdoors-v11', label: 'Outdoors' },
                { value: 'mapbox://styles/mapbox/light-v10', label: 'Light' },
                { value: 'mapbox://styles/mapbox/dark-v10', label: 'Dark' },
                { value: 'mapbox://styles/mapbox/satellite-v9', label: 'Satellite' },
                { value: 'mapbox://styles/mapbox/navigation-preview-day-v4', label: 'Navigation night' },
                { value: 'mapbox://styles/mapbox/navigation-preview-night-v4', label: 'Navigation day' },
            ],
            activeLayer: "mapbox://styles/mapbox/dark-v10"
        };

        this._onEnter = this._onEnter.bind(this);
        this._onLeave = this._onLeave.bind(this);
        this._onRadio = this._onRadio.bind(this);
    }

    _onLeave(e) {
        this.setState({
            renderSelection: false,
        })
    }
    _onEnter(e) {
        this.setState({
            renderSelection: true
        })
    }

    _onRadio(e) {
        this.props._handleMapStyle(e);
        this.setState({
            activeLayer: e.target.value
        })
    }

    render() {
        return (
            <Container className="menuBar tileSelect" fluid>
                {this.state.renderSelection ?
                    <Form onMouseLeave={this._onLeave}>
                        {this.state.options.map((option, index) => {
                            return (<div key={option.value}>
                                <label >
                                    <input type="radio" onChange={this._onRadio} defaultChecked={this.state.activeLayer == option.value ? true : false} name="layers" type="radio" value={option.value} />
                                    {option.label}
                                </label>
                                <br></br>
                            </div>
                            )
                        })}
                    </Form> :
                    <IoLogoBuffer onMouseEnter={this._onEnter} style={{ width: '44px', height: '58px' }} />
                }
            </Container>
        )
    }
}

export default TileSelect;
