import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Grid, Jumbotron, Row} from "react-bootstrap";
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
            message: this.state.message
        });
        this.setState({
            message: ''
        });
    }


    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="timetable-jum">
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
                                            />
                                        </div>
                                    </FormGroup>
                                    {' '}
                                    <FormGroup>
                                        {' '}
                                        <input className="message-input" type="text" placeholder="Message"
                                               onChange={this.onMessageChange.bind(this)} required/>
                                    </FormGroup>
                                    {' '}
                                    <Button className="send-submit-btn" type="submit">
                                        Send
                                    </Button>
                                </Form>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        );
    }
}