import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Station.css';
import '../css/Pagination.css';
import Pagination from 'rc-pagination';
import en_GB from "rc-pagination/es/locale/en_GB";

export default class Station extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            stationsPerPage: 8
        };

    }

    onPageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    deleteStation(id) {
        this.props.stationActions.deleteStation(id);
    }

    addStation(event) {
        event.preventDefault();
        this.props.stationActions.addStation({
            title: this.stationTitleInput.value,
        });
        this.stationTitleInput.value = '';
    }

    onSearchInputChange(event){
        let updatedList = this.props.stationReducer.filterStations;
        updatedList = updatedList.filter(function(item){
            return (item.title.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1);
        });
        this.props.stationActions.filter(updatedList);
    }


    render() {
        const indexOfLastStation = this.state.currentPage * this.state.stationsPerPage;
        const indexOfFirstStation = indexOfLastStation - this.state.stationsPerPage;
        const currentStations = this.props.stationReducer.stations.slice(indexOfFirstStation, indexOfLastStation);

        return (
            <div>
                <Container className="trains">
                    <Row>
                        <Col sm={6}>
                            <h2>Stations</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>
                                        <input className="search-station" type="text" onChange={this.onSearchInputChange.bind(this)}/>
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                {currentStations
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
                                                <button className="remove-station-btn"
                                                        onClick={this.deleteStation.bind(this, station.id)}>Remove
                                                </button>
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

                <Pagination className="pagination"
                            onChange={this.onPageChange}
                            locale={en_GB}
                            current={this.state.currentPage}
                            pageSize={8}
                            total={this.props.stationReducer.stations.length}/>
            </div>
        )
    }
}