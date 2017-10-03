import React, { Component } from 'react';
import ReactModal from 'react-modal';
import *as trainActions from './actions/trainActions';
import '../css/Timepicker.css';
import TimePicker from 'rc-time-picker';
import * as moment from "moment";
import Select from 'react-select';
import 'react-select/dist/react-select.css';



export default class Train extends Component{
    constructor () {
        super();
        this.state = {
            showAddTrainModal: false,
            showRouteModal: false,
            train:{
                id: '',
                number: '',
                tariff: ''
            },
            departPeriod: '',
            arrivePeriod: '',

            select: {
                disabled: false,
                stayOpen: false,
                value: []
            }
        };
    }


    handleOpenAddTrainModal () {
        this.setState({
            showAddTrainModal: true,
            train:{}
        });
        trainActions.setAddTrainMessage('');
    }

    handleCloseAddTrainModal () {
        this.setState({
            showAddTrainModal: false
        });
        trainActions.setAddTrainMessage('');
    }

    handleOpenRouteModal(id) {
        this.setState({
            showRouteModal: true,
            train: {
                id: id
            }
        });
    }

    handleCloseRouteModal () {
        this.setState({
            showRouteModal: false,
            train: {
                id: ''
            },
            departPeriod: ''
        });
    }

    addTrain(event){
        event.preventDefault();
        this.props.trainActions.addTrain({
            number: this.trainNumberInput.value,
            tariff: this.tariffInput.value,
        });
        this.trainNumberInput.value = '';
        this.tariffInput.value = '';
    }

    deleteTrain(id){
        this.props.trainActions.deleteTrain(id);
    }

    getRoute(id){
        this.props.trainActions.getRoute(id);
        this.handleOpenRouteModal(id);
    }

    addRoutePoint(event){

        this.props.trainActions.addRoutePoint({
            departureTime: {
                hour: 11,
                minute: 30,
                second: 0,
                nano: 0
            },
            arrivalTime: {
                hour: 11,
                minute: 30,
                second: 0,
                nano: 0
            },
            departPeriod: 'sun',
            arrivePeriod: 'sun',
            train: {
                number: "123A"
            },
            station: {
                title: "Znamensk"
            }
        });
        this.setState({
            departPeriod: '',
            arrivePeriod: ''
        });
        this.stationInput.value = '';
    }

    handleSelectChange (value) {
        this.setState({
            select:{
                value: value
            },
            departPeriod: value
        });
    }

    render() {
        const days = [
            { label: 'SUN', value: 'sun' },
            { label: 'MON', value: 'mon' },
            { label: 'TUE', value: 'tue' },
            { label: 'WED', value: 'wed' },
            { label: 'THU', value: 'thu' },
            { label: 'FRI', value: 'fri' },
            { label: 'SAT', value: 'sat' }
        ];

        return (
            <div>

                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Number</th>
                        <th>Tariff</th>
                        <th><button onClick={this.handleOpenAddTrainModal.bind(this)}>+</button></th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.trainReducer.trains.map((train, index) =>
                        <tr key={index}>
                            <td>{train.id}</td>
                            <td>{train.number}</td>
                            <td>{train.tariff}</td>
                            <td><button onClick={this.deleteTrain.bind(this, train.id)}>Remove</button></td>
                            <td><button onClick={this.getRoute.bind(this, train.id)}>Route</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <ReactModal
                    isOpen={this.state.showAddTrainModal}
                    contentLabel="showAddTrainModal"
                >
                    <form onSubmit={this.addTrain.bind(this)}>
                        <input type="text" placeholder="trainNumber" ref={(input) => {this.trainNumberInput = input}}/>
                        <input type="text" placeholder="tariff" ref={(input) => {this.tariffInput = input}}/>

                        <button type="button" onClick={this.handleCloseAddTrainModal.bind(this)}>Cancel</button>
                        <button type="submit">Save</button>
                    </form>
                    <h4>{this.props.trainReducer.addTrainMessage}</h4>
                </ReactModal>

                <ReactModal
                    isOpen={this.state.showRouteModal}
                    contentLabel="showRouteModal"
                >
                    <form onSubmit={this.addRoutePoint.bind(this)}>
                        <input type="text" placeholder="Station" ref={(input) => {this.stationInput = input}}/>
                        <Select
                            closeOnSelect={!this.state.select.stayOpen}
                            disabled={this.state.select.disabled}
                            multi
                            onChange={this.handleSelectChange.bind(this)}
                            options={days}
                            placeholder="Departure days"
                            simpleValue
                            value={this.state.select.value}
                        />
                        <TimePicker style={{ width: 50 }} defaultValue={null} showSecond={false}/>
                        <input type="text" placeholder="Arrival period" ref={(input) => {this.arrivePeriodInput = input}}/>
                        <TimePicker style={{ width: 50 }} defaultValue={null} showSecond={false}/>

                        <button type="submit">Save</button>
                    </form>

                    <table>
                        <thead>
                        <tr>
                            <th>Station</th>
                            <th>Departure days</th>
                            <th>Departure time</th>
                            <th>Arrival days</th>
                            <th>Arrival time</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.props.trainReducer.route.map((route, index) =>
                            <tr key={index}>
                                <td>{route.station.title}</td>
                                <td>{route.departPeriod}</td>
                                <td>{route.departureTime.hour} : {route.departureTime.minute}</td>
                                <td>{route.arrivePeriod}</td>
                                <td>{route.arrivalTime.hour} : {route.arrivalTime.minute}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <button type="button" onClick={this.addRoutePoint.bind(this, this.state.trainId)}>Add route point</button>
                    <button type="button" onClick={this.handleCloseRouteModal.bind(this)}>Cancel</button>
                </ReactModal>
            </div>
        );
    }
}