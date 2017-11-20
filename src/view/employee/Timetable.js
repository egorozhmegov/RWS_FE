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

        var currentdate = new Date();
        var date = currentdate.getDate();
        date.length === 1 ? date = '0' + date : date;
        var month = currentdate.getMonth()+1;
        month.length === 1 ? month = '0' + month : month;
        var year = currentdate.getFullYear();
        var hour = currentdate.getHours();
        hour.length === 1 ? hour = '0' + hour : hour;
        var min = currentdate.getMinutes();
        min.length === 1 ? min = '0' + min : min;
        var resultDate = date+"."+month+"."+year+", "+hour+":"+min;

        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="timetable-jum">
                            <Grid>
                                <Row>
                                    <Col xs={6} md={6}>
                                        <div className="message-form">
                                            <Form inline onSubmit={this.sendMessage.bind(this)}>
                                                <FormGroup>
                                                    {' '}
                                                    <div className="select-station">
                                                        <Select className="select-form"
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
                                                    </div>
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <div className="select-train">
                                                        <Select className="select-form"
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
                                                    </div>
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <div className="select-status">
                                                        <Select className="select-form"
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
                                                    </div>
                                                </FormGroup>
                                                {' '}
                                                <FormGroup>
                                                    {' '}
                                                    <input className="message-input" type="text" placeholder="Message"
                                                           onChange={this.onMessageChange.bind(this)}/>
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
                                                    return resultDate + ' -  NOTICE: station: ' + message.station
                                                        + ', train: ' + message.train + ', status: ' + message.status +
                                                        ', message: ' + message.message;
                                                })}

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