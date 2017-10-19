import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Schedule.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../css/DatePicker.css';

export default class Schedule extends Component {
    constructor() {
        super();
        this.state = {
            stationSelect: {
                disabled: false,
                stayOpen: false,
                stationValue: []
            },
            startDate: moment()
        }
    }

    handleSelectStationChange(value) {
        this.setState({
            stationSelect: {
                stationValue: value
            }
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date.isAfter(moment()) ? date : moment()
        });
    }

    render() {
        return (
            <div>
                <Container className="schedule">
                    <Row>
                        <Col sm={5}>
                        </Col>

                        <Col sm={4}>
                            <h2>Schedule</h2>
                        </Col>

                        <Col sm={3}>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>

                        </Col>

                        <Col sm={4}>
                            <select>
                                {this.props.scheduleReducer.stations.map((station, index) => {
                                    return <option key={index}>{station.title}</option>;
                                })}
                            </select>

                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleDateChange.bind(this)}
                            />
                        </Col>

                        <Col sm={4}>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}