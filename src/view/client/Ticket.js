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

    searchTrain() {

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
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
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
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <DatePicker className="date-input"
                                                                selected={this.state.startDate}
                                                                onChange={this.handleDateChange.bind(this)}
                                                                dateFormat="DD.MM.YYYY"
                                                                relativeSize={true}
                                                    />
                                                </FormGroup>
                                                {' '}
                                                <Button className="submit-btn" type="submit">
                                                    Search
                                                </Button>
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
