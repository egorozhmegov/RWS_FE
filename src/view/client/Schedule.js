import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Schedule.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../css/DatePicker.css';
import Clock from 'react-live-clock';
import showLogo from '../img/loupe.svg';
import Select from 'react-select';

export default class Schedule extends Component {
    constructor() {
        super();
        this.state = {
            stSelect: {
                disabled: false,
                stayOpen: false,
                value: 'St.Petersburg'
            },
            startDate: moment(),
        }
    }

    componentWillMount() {
        this.props.scheduleActions
            .getSchedule(this.state.stSelect.value, this.state.startDate)
    }

    handleSelectStationChange(value) {
        this.setState({
            stSelect: {
                value: value
            }
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date.isAfter(moment()) ? date : moment()
        });
    }

    getSchedule(event) {
        event.preventDefault();
        this.props.scheduleActions
            .getSchedule(this.state.stSelect.value, this.state.startDate)
    }

    render() {
        return (
            <Container className="schedule">

                <Row>
                    <Col sm={5}>
                    </Col>

                    <Col sm={4}>
                        <h1><Clock className="clock" format={'HH:mm:ss'} ticking={true} timezone={'Europe/Moscow'}/>
                        </h1>
                    </Col>

                    <Col sm={3}>
                    </Col>
                </Row>

                <Row>
                    <Col sm={4}>
                        <h3>Arrival</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Train</th>
                                <th>Arrival time</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.props.scheduleReducer.schedule.arriveSchedule
                                .map((schedule, index) => {
                                        let arrHour;
                                        let arrMinute;
                                        if (schedule.arrivalTime === null) {
                                            arrHour = '';
                                            arrMinute = '';
                                        } else {
                                            arrHour = schedule.arrivalTime[0];
                                            arrMinute = schedule.arrivalTime[1];
                                        }
                                        if (arrHour.toString().length === 1) arrHour = '0' + arrHour;
                                        if (arrMinute.toString().length === 1) arrMinute = '0' + arrMinute;

                                        return <tr key={index}>
                                            <td>{schedule.train.number}</td>
                                            <td>{arrHour} {arrHour === '' ? '' : ':'} {arrMinute}</td>
                                        </tr>
                                    }
                                )}
                            </tbody>
                        </table>
                    </Col>

                    <Col sm={4}>
                        <form className="schedule-form" onSubmit={this.getSchedule.bind(this)}>

                            <Select className="schedule-st"
                                    closeOnSelect={!this.state.stSelect.stayOpen}
                                    disabled={this.state.stSelect.disabled}
                                    onChange={this.handleSelectStationChange.bind(this)}
                                    options={this.props.scheduleReducer.stations.map((station, index) => {
                                        return {label: station.title, value: station.title}
                                    })}
                                    placeholder="Station"
                                    simpleValue
                                    value={this.state.stSelect.value}
                            />


                            <DatePicker className="date-input"
                                        selected={this.state.startDate}
                                        onChange={this.handleDateChange.bind(this)}
                                        dateFormat="DD.MM.YYYY"
                            />


                            <a className="show-logo" href="/rws/client">
                                <img src={showLogo} alt="show_logo"
                                     onClick={this.getSchedule.bind(this)}/>
                            </a>

                        </form>
                    </Col>

                    <Col sm={4}>
                        <h3>Departure</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Train</th>
                                <th>Departure time</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.props.scheduleReducer.schedule.departSchedule
                                .map((schedule, index) => {
                                        let depHour;
                                        let depMinute;
                                        if (schedule.departureTime === null) {
                                            depHour = '';
                                            depMinute = '';
                                        } else {
                                            depHour = schedule.departureTime[0];
                                            depMinute = schedule.departureTime[1];
                                        }
                                        if (depHour.toString().length === 1) depHour = '0' + depHour;
                                        if (depMinute.toString().length === 1) depMinute = '0' + depMinute;

                                        return <tr key={index}>
                                            <td>{schedule.train.number}</td>
                                            <td>{depHour} {depHour === '' ? '' : ':'} {depMinute}</td>
                                        </tr>
                                    }
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        );
    }
}