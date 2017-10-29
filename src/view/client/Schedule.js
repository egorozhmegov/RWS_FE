import React, {Component} from 'react';
import '../css/Schedule.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../css/DatePicker.css';
import Select from 'react-select';
import {Button, Col, Form, FormGroup, Grid, Jumbotron, Row} from "react-bootstrap";
import ReactTable from "react-table";

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
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="schedule-jum">
                            <Row>
                                <Col xs={6} md={12}>
                                    <Form inline onSubmit={this.getSchedule.bind(this)}>
                                        <FormGroup>
                                            {' '}
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
                                        </FormGroup>
                                        {' '}
                                        <FormGroup>
                                            {' '}
                                            <DatePicker className="date-input"
                                                        selected={this.state.startDate}
                                                        onChange={this.handleDateChange.bind(this)}
                                                        dateFormat="DD.MM.YYYY"
                                            />
                                        </FormGroup>
                                        {' '}
                                        <Button className="submit-btn" type="submit">
                                            Show
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} md={6}>
                                    <div className="align-center">
                                        <ReactTable
                                            data={this.props.scheduleReducer.schedule.arriveSchedule}
                                            filterable={false}
                                            sortarable={false}
                                            columns={[
                                                {
                                                    Header: () => <h4><strong className="tab-header">Arrival</strong></h4>,
                                                    columns: [
                                                        {
                                                            Header: () => <strong>Train</strong>,
                                                            accessor: 'train.number'

                                                        },
                                                        {
                                                            Header: () => <strong>Arrival time</strong>,
                                                            accessor: (schedule) => {
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

                                                                return <div>{arrHour} {arrHour === '' ? '' : ':'} {arrMinute}</div>

                                                            },
                                                            id: 'id'
                                                        }
                                                    ]
                                                }
                                            ]}
                                            pageSize={this.props.scheduleReducer.schedule.arriveSchedule.length}
                                            showPagination={false}
                                        />
                                    </div>
                                </Col>

                                <Col xs={6} md={6}>
                                    <div className="align-center">
                                        <ReactTable
                                            data={this.props.scheduleReducer.schedule.departSchedule}
                                            filterable={false}
                                            sortarable={false}
                                            columns={[
                                                {
                                                    Header: () => <h4><strong className="tab-header">Departure</strong></h4>,
                                                    columns: [
                                                        {
                                                            Header: () => <strong>Train</strong>,
                                                            accessor: 'train.number'
                                                        },
                                                        {
                                                            Header: () => <strong>Departure time</strong>,
                                                            accessor: (schedule) => {
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

                                                                return <div>{depHour} {depHour === '' ? '' : ':'} {depMinute}</div>
                                                            },
                                                            id: 'id'
                                                        }
                                                    ]
                                                }
                                            ]}
                                            pageSize={this.props.scheduleReducer.schedule.departSchedule.length}
                                            showPagination={false}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
