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
                { value: 'mapbox://styles/mapbox/light-v10', label: 'Light' },
                { value: 'mapbox://styles/mapbox/dark-v10', label: 'Dark' },
                { value: 'mapbox://styles/mapbox/satellite-v9', label: 'Satellite' },
                { value: 'mapbox://styles/mapbox/navigation-preview-day-v4', label: 'Navigation dark' },
                { value: 'mapbox://styles/mapbox/navigation-preview-night-v4', label: 'Navigation light' },
            ],
            activeLayer: "mapbox://styles/mapbox/dark-v10",
            buildings:false,
            accidents:false,
            heatmap:false,
            injuries:false
        };

        this._onEnter = this._onEnter.bind(this);
        this._onLeave = this._onLeave.bind(this);
        this._onRadio = this._onRadio.bind(this);
        this._toggleBuildings = this._toggleBuildings.bind(this);
        this._toggleAccidents = this._toggleAccidents.bind(this);
        this._toggleHeatmap = this._toggleHeatmap.bind(this);
        this._showOnlyInjury = this._showOnlyInjury.bind(this);
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
    _toggleBuildings(e){

        this.setState({buildings:e.target.checked})
        this.props._toggleBuildings(e);

    }
    _toggleAccidents(e){
        this.setState({accidents:e.target.checked})
        this.props._toggleAccidents(e);
    }
    _toggleHeatmap(e){
        this.setState({heatmap:e.target.checked})
        this.props._toggleHeatMap(e)
    }

    _showOnlyInjury(e){
        this.setState({injuries:e.target.checked})
        this.props._showOnlyInjury(e);
    }


    render() {
        return (
            <Container className="menuBar tileSelect" fluid>
                {this.state.renderSelection ?
                    <Form onMouseLeave={this._onLeave}>
                        <div>
                            <label >
                                <input checked={this.state.buildings} type="checkbox" onChange={this._toggleBuildings} />
                                3D Layer
                                </label>
                            <br></br>
                        </div>
                        <div>
                            <label >
                                <input checked={this.state.accidents} type="checkbox" onChange={this._toggleAccidents}  />
                                Accidents(as Markers)
                                </label>
                            <br></br>
                        </div>
                        <div>
                            <label >
                                <input checked={this.state.heatmap} type="checkbox" onChange={this._toggleHeatmap} />
                                Heatmap
                                </label>
                            <br></br>
                        </div>
                        <div>
                            <label >
                                <input checked={this.state.injuries} type="checkbox" onChange={this._showOnlyInjury} />
                                Accidents with injuries
                                </label>
                            <br></br>
                        </div>
                        <hr></hr>
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
                    <IoLogoBuffer onMouseEnter={this._onEnter} style={{ width: '20px', height: '34px' }} />
                }
            </Container>
        )
    }
}

export default TileSelect;
