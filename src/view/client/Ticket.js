import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import '../css/DatePicker.css';
import '../css/Ticket.css';
import moment from 'moment';

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

    searchTrain(){

    }

    render() {
        return (
            <Container>

                <Row>
                    <Col sm={2}>
                    </Col>

                    <Col sm={10}>
                        <div className="search-form">
                            <form onSubmit={this.searchTrain.bind(this)}>
                                <div className="inline-element">
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

                                <div className="inline-element">
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

                                <div className="inline-element">
                                    <DatePicker className="train-date-input"
                                                selected={this.state.startDate}
                                                onChange={this.handleDateChange.bind(this)}
                                                dateFormat="DD.MM.YYYY"
                                    />
                                </div>

                                <div className="inline-element">
                                    <button className="search-btn" type="submit">Search</button>
                                </div>


                            </form>
                        </div>
                    </Col>

                    <Col sm={2}>
                    </Col>
                </Row>

            </Container>
        );
    }
}