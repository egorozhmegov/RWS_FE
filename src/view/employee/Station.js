import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Station.css';

export default class Station extends Component {

    deleteStation(id){
        this.props.stationActions.deleteStation(id);
    }

    addStation(event){
        event.preventDefault();
        this.props.stationActions.addStation({
            title: this.stationTitleInput.value,
        });
        this.stationTitleInput.value = '';
    }

    render(){
        return (
        <Container className="trains">
            <Row>
                <Col sm={6}>
                    <h2>Stations</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.props.stationReducer.stations
                            .sort((a, b) => {
                                if (a.title.toUpperCase() < b.title.toUpperCase()) {
                                    return -1;
                                }
                                if (a.title.toUpperCase() > b.title.toUpperCase()) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            })
                            .map((station, index) =>
                                <tr key={index}>
                                    <td>{station.title}</td>
                                    <td>
                                        <button className="remove-station-btn" onClick={this.deleteStation.bind(this, station.id)}>Remove</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>

                <Col sm={1}></Col>

                <Col sm={5}>
                    <div><h2>New station</h2></div>

                    <form className="add-station-form" onSubmit={this.addStation.bind(this)}>
                        <div>Title</div>
                        <input className="add-station-input" type="text" placeholder="Title" ref={(input) => {
                            this.stationTitleInput = input
                        }}/>

                        <button className="add-station-btn" type="submit">Save</button>
                    </form>
                    <h4 className="station-success-message">{this.props.stationReducer.addStationSuccessMessage}</h4>
                    <h4 className="station-error-message">{this.props.stationReducer.addStationErrorMessage}</h4>
                </Col>
            </Row>
        </Container>
        )
    }
}