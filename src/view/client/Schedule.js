import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Schedule.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../css/DatePicker.css';
import Clock from 'react-live-clock';

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
                            <h1><Clock className="clock" format={'HH:mm:ss'} ticking={true} timezone={'Europe/Moscow'} /></h1>
                        </Col>

                        <Col sm={3}>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>

                        </Col>

                        <Col sm={4}>
                            <form className="schedule-form">
                                <select className="select-input">
                                    {this.props.scheduleReducer.stations.map((station, index) => {
                                        return <option className="select-option" key={index}>{station.title}</option>;
                                    })}
                                </select>

                                <DatePicker className="date-input"
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange.bind(this)}
                                    dateFormat="DD.MM.YYYY"
                                />
                            </form>
                        </Col>

                        <Col sm={4}>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}