import React, { Component } from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Jumbotron, Row} from "react-bootstrap";
import '../css/Timetable.css';
import Select from 'react-select';

export default class Timetable extends Component {
    constructor() {
        super();
        this.state = {
            stationSelect: {
                disabled: false,
                stayOpen: false,
                value: ''
            },
            trainSelect: {
                disabled: false,
                stayOpen: false,
                value: ''
            },
            statusSelect: {
                disabled: false,
                stayOpen: false,
                value: ''
            },
            message: ''
        }
    }

    handleSelectStationChange(value){
        this.setState({
            stationSelect: {
                value: value
            }
        });
    }

    handleSelectTrainChange(value){
        this.setState({
            trainSelect: {
                value: value
            }
        });
    }

    handleSelectStatusChange(value){
        this.setState({
            statusSelect: {
                value: value
            }
        });
    }

    onMessageChange(event){
        this.setState({
            message: event.target.value
        });
    }

    sendMessage(event){
        event.preventDefault();
        this.props.timetableActions.sendTimetableMessage({
            station: this.state.stationSelect.value,
            train: this.state.trainSelect.value,
            status: this.state.statusSelect.value,
            message: this.state.message
        });
        this.setState({
            stationSelect: {
                disabled: false,
                stayOpen: false,
                value: ''
            },
            trainSelect: {
                disabled: false,
                stayOpen: false,
                value: ''
            },
            statusSelect: {
                disabled: false,
                stayOpen: false,
                value: ''
            },
            message: ''
        });
    }


    render() {

        const status = ["Arrival", "Departure"];

        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="timetable-jum">
                            <Grid>
                                <Row>
                                    <Col xs={6} md={6}>
                                        <h3><strong>Send notification</strong></h3>
                                        <div className="mess-form">
                                            <Form onSubmit={this.sendMessage.bind(this)}>
                                                <FormGroup>
                                                    {' '}
                                                    <Select className="select-station"
                                                            closeOnSelect={!this.state.stationSelect.stayOpen}
                                                            disabled={this.state.stationSelect.disabled}
                                                            onChange={this.handleSelectStationChange.bind(this)}
                                                            options={this.props.timetableReducer.stations.map((station, index) => {
                                                                return {label: station.title, value: station.title}
                                                            })}
                                                            placeholder="Station"
                                                            simpleValue
                                                            value={this.state.stationSelect.value}
                                                            required
                                                    />
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <Select className="select-station"
                                                            closeOnSelect={!this.state.trainSelect.stayOpen}
                                                            disabled={this.state.trainSelect.disabled}
                                                            onChange={this.handleSelectTrainChange.bind(this)}
                                                            options={this.props.timetableReducer.trains.map((train, index) => {
                                                                return {label: train.number, value: train.number}
                                                            })}
                                                            placeholder="Train"
                                                            simpleValue
                                                            value={this.state.trainSelect.value}
                                                            required
                                                    />
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <Select className="select-station"
                                                            closeOnSelect={!this.state.statusSelect.stayOpen}
                                                            disabled={this.state.statusSelect.disabled}
                                                            onChange={this.handleSelectStatusChange.bind(this)}
                                                            options={status.map((item, index) => {
                                                                return {label: item, value: item}
                                                            })}
                                                            placeholder="Status"
                                                            simpleValue
                                                            value={this.state.statusSelect.value}
                                                            required
                                                    />
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <input className="message-input" type="text" placeholder="Message"
                                                           onChange={this.onMessageChange.bind(this)} value={this.state.message}/>
                                                </FormGroup>
                                                {' '}
                                                <Button className="send-submit-btn" type="submit">
                                                    Send
                                                </Button>
                                            </Form>
                                        </div>
                                    </Col>

                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="formControlsTextarea">
                                            <ControlLabel><h3><strong>Timetable events</strong></h3></ControlLabel>
                                            <FormControl
                                                className="message-box"
                                                value={this.props.timetableReducer.messages.map((message, index) => {
                                                    return message + '.\n';
                                                }).join("")}
                                                readOnly
                                                componentClass="textarea"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Grid>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        );
    }
}