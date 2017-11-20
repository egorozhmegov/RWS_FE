import React, {Component} from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import '../css/DatePicker.css';
import '../css/Ticket.css';
import moment from 'moment';
import {Button, Col, Form, FormGroup, Grid, Jumbotron, Row} from "react-bootstrap";

export default class Ticket extends Component {
    constructor() {
        super();
        this.state = {
            startDate: moment(),
            fromSelect: {
                disabled: false,
                stayOpen: false,
                value: ''
            },

            toSelect: {
                disabled: false,
                stayOpen: false,
                value: ''
            }
        }
    }

    handleSelectFromChange(value) {
        this.setState({
            fromSelect: {
                value: value
            }
        });
    }

    handleSelectToChange(value) {
        this.setState({
            toSelect: {
                value: value
            }
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date.isAfter(moment()) ? date : moment()
        });
    }

    searchTrain(event) {
        event.preventDefault();
        this.props.ticketActions.searchTrains({
            stationFrom: {
                title: this.state.fromSelect.value
            },
            stationTo: {
                title: this.state.toSelect.value
            },
            departDate: [
                this.state.startDate._d.getFullYear(),
                this.state.startDate._d.getMonth() + 1,
                this.state.startDate._d.getDate()
            ]
        });
        this.props.ticketActions.setErrorMessage('');
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="ticket-jum">
                            <Row>
                                <Col xs={6} md={1}>
                                </Col>

                                <Col xs={6} md={10}>
                                    <Jumbotron className="ticket-search-jum">
                                        <div className="search-form">
                                            <Form inline onSubmit={this.searchTrain.bind(this)}>
                                                <FormGroup>
                                                    {' '}
                                                    <div className="select-station">
                                                        <Select className="select-form"
                                                                closeOnSelect={!this.state.fromSelect.stayOpen}
                                                                disabled={this.state.fromSelect.disabled}
                                                                onChange={this.handleSelectFromChange.bind(this)}
                                                                options={this.props.ticketReducer.stations.map((station, index) => {
                                                                    return {label: station.title, value: station.title}
                                                                })}
                                                                placeholder="From"
                                                                simpleValue
                                                                value={this.state.fromSelect.value}
                                                        />
                                                    </div>
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <div className="select-station">
                                                        <Select className="select-form"
                                                                closeOnSelect={!this.state.toSelect.stayOpen}
                                                                disabled={this.state.toSelect.disabled}
                                                                onChange={this.handleSelectToChange.bind(this)}
                                                                options={this.props.ticketReducer.stations.map((station, index) => {
                                                                    return {label: station.title, value: station.title}
                                                                })}
                                                                placeholder="To"
                                                                simpleValue
                                                                value={this.state.toSelect.value}
                                                        />
                                                    </div>
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <DatePicker className="train-date-input"
                                                                selected={this.state.startDate}
                                                                onChange={this.handleDateChange.bind(this)}
                                                                dateFormat="DD.MM.YYYY"
                                                                relativeSize={true}
                                                    />
                                                </FormGroup>
                                                {' '}
                                                <Button className="search-submit-btn" type="submit">
                                                    Search
                                                </Button>
                                                <h4 className="error-message">
                                                    <strong>{this.props.ticketReducer.errorMessage}</strong>
                                                </h4>
                                            </Form>
                                        </div>
                                    </Jumbotron>
                                </Col>

                                <Col xs={6} md={1}>
                                </Col>

                            </Row>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
