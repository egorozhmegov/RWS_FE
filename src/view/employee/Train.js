import React, { Component } from 'react';
import ReactModal from 'react-modal';
import *as trainActions from './actions/trainActions';

export default class Train extends Component{
    constructor () {
        super();
        this.state = {
            showAddTrainModal: false,
            showRouteModal: false,
            train:{
                number: '',
                tariff: ''
            },
            trainId: ''
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
            trainId: id
        });
    }

    handleCloseRouteModal () {
        this.setState({
            showRouteModal: false,
            trainId: ''
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
            train: {
                id: ''
            },
            station: {
                title: this.stationInput.value
            }
        });
        this.stationInput.value = '';
        this.departPeriodInput.value = '';
        this.departureTimeInput.value = '';
        this.arrivePeriodInput.value = '';
        this.arrivalTimeInput.value = '';
    }


    render() {
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
                        <input type="text" placeholder="Departure period" ref={(input) => {this.departPeriodInput = input}}/>
                        <input type="text" placeholder="Departure time" ref={(input) => {this.departureTimeInput = input}}/>
                        <input type="text" placeholder="Arrival period" ref={(input) => {this.arrivePeriodInput = input}}/>
                        <input type="text" placeholder="Arrival time" ref={(input) => {this.arrivalTimeInput = input}}/>

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