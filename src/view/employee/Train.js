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

            disabled: false,
            stayOpen: false,
            value: []
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
            }
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
        event.preventDefault();
        this.props.trainActions.addRoutePoint({
            departureTime: {
                hour:'',
                minute: ''
            },
            arrivalTime: {
                hour:'',
                minute: ''
            },
            departPeriod: this.departPeriodInput.value,
            arrivePeriod: this.arrivePeriodInput.value,
            train: this.state.train,
            station: {
                title: this.stationInput.value
            }
        });
        this.stationInput.value = '';
        this.departPeriodInput.value = '';
        this.arrivePeriodInput.value = '';
    }

    handleChangeDepartPeriod(event){
        this.setState({
            departPeriod: event.target.value
        });
        console.log(this.state.departPeriod)
    }

    handleSelectChange (value) {
        console.log('You\'ve selected:', value);
        this.setState({
            value: value
        });
    }

    render() {
        const options = [
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Strawberry', value: 'strawberry' },
            { label: 'Caramel', value: 'caramel' },
            { label: 'Cookies and Cream', value: 'cookiescream' },
            { label: 'Peppermint', value: 'peppermint' },
        ];

        return (
            <div>
                <Select
                    closeOnSelect={!this.state.stayOpen}
                    disabled={this.state.disabled}
                    multi
                    onChange={this.handleSelectChange.bind(this)}
                    options={options}
                    placeholder="Select your favourite(s)"
                    simpleValue
                    value={this.state.value}
                />

                <select style={{width: 55}} value={this.state.departPeriod} onChange={this.handleChangeDepartPeriod.bind(this)}>
                    <option value="sun">SUN</option>
                    <option value="mon">MON</option>
                    <option value="tue">TUE</option>
                    <option value="wed">WED</option>
                    <option value="thu">THU</option>
                    <option value="fri">FRI</option>
                    <option value="sat">SAT</option>

                </select>

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
                        <input type="text" placeholder="Departure period" ref={(input) => {this.departPeriodInput = input}}/>
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