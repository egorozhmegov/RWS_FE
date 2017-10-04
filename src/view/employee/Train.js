import React, {Component} from 'react';
import ReactModal from 'react-modal';
import *as trainActions from './actions/trainActions';
import '../css/Timepicker.css';
import TimePicker from 'rc-time-picker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const days = [
    {label: 'SUN', value: 'sun'},
    {label: 'MON', value: 'mon'},
    {label: 'TUE', value: 'tue'},
    {label: 'WED', value: 'wed'},
    {label: 'THU', value: 'thu'},
    {label: 'FRI', value: 'fri'},
    {label: 'SAT', value: 'sat'}
];

export default class Train extends Component {
    constructor() {
        super();
        this.state = {
            showAddTrainModal: false,
            showRouteModal: false,
            train: {
                id: '',
                number: '',
                tariff: ''
            },
            departPeriod: '',
            arrivePeriod: '',

            depSelect: {
                disabled: false,
                stayOpen: false,
                depValue: []
            },

            arrSelect: {
                disabled: false,
                stayOpen: false,
                arrValue: []
            },

            departureTime: {
                hour: '',
                minute: ''
            },

            arrivalTime: {
                hour: '',
                minute: ''
            }
        };
    }


    handleOpenAddTrainModal() {
        this.setState({
            showAddTrainModal: true,
            train: {}
        });
        trainActions.setAddTrainMessage('');
    }

    handleCloseAddTrainModal() {
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

    handleCloseRouteModal() {
        this.setState({
            showRouteModal: false,
            train: {
                id: ''
            },
            departPeriod: ''
        });
    }

    addTrain(event) {
        event.preventDefault();
        this.props.trainActions.addTrain({
            number: this.trainNumberInput.value,
            tariff: this.tariffInput.value,
        });
        this.trainNumberInput.value = '';
        this.tariffInput.value = '';
    }

    deleteTrain(id) {
        this.props.trainActions.deleteTrain(id);
    }

    getRoute(id) {
        this.props.trainActions.getRoute(id);
        this.handleOpenRouteModal(id);
    }

    addRoutePoint(event) {
        event.preventDefault();
        this.props.trainActions.addRoutePoint({
            departureTime:
                this.state.departureTime.hour === '' ? null :[
                parseInt(this.state.departureTime.hour, 10),
                parseInt(this.state.departureTime.minute, 10)
            ],
            arrivalTime:
                this.state.arrivalTime.hour === '' ? null : [
                parseInt(this.state.arrivalTime.hour, 10),
                parseInt(this.state.arrivalTime.minute, 10)
            ],
            departPeriod: this.state.departPeriod,
            arrivePeriod: this.state.arrivePeriod,
            train: this.state.train,
            station: {
                title: this.stationInput.value
            }
        });
        this.setState({
            departPeriod: '',
            arrivePeriod: ''
        });
        this.stationInput.value = '';
    }

    handleSelectDepartChange(value) {
        this.setState({
            depSelect: {
                depValue: value
            },
            departPeriod: value
        });
    }

    handleSelectArriveChange(value) {
        this.setState({
            arrSelect: {
                arrValue: value
            },
            arrivePeriod: value
        });
    }

    onDepTimeChange(value) {
        this.setState({
            departureTime: {
                hour: value === null ? '' : value.format("HH"),
                minute: value === null ? '' : value.format("mm")
            }
        })
    }

    onArrTimeChange(value) {
        this.setState({
            arrivalTime: {
                hour: value === null ? '' : value.format("HH"),
                minute: value === null ? '' : value.format("mm")
            }
        })
    }

    render() {
        let depDays = days;
        let arrDays = days;

        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Number</th>
                        <th>Tariff</th>
                        <th>
                            <button onClick={this.handleOpenAddTrainModal.bind(this)}>+</button>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.trainReducer.trains.map((train, index) =>
                        <tr key={index}>
                            <td>{train.id}</td>
                            <td>{train.number}</td>
                            <td>{train.tariff}</td>
                            <td>
                                <button onClick={this.deleteTrain.bind(this, train.id)}>Remove</button>
                            </td>
                            <td>
                                <button onClick={this.getRoute.bind(this, train.id)}>Route</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <ReactModal
                    isOpen={this.state.showAddTrainModal}
                    contentLabel="showAddTrainModal"
                >
                    <form onSubmit={this.addTrain.bind(this)}>
                        <input type="text" placeholder="trainNumber" ref={(input) => {
                            this.trainNumberInput = input
                        }}/>
                        <input type="text" placeholder="tariff" ref={(input) => {
                            this.tariffInput = input
                        }}/>

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
                        <input type="text" placeholder="Station" ref={(input) => {
                            this.stationInput = input
                        }}/>
                        <Select
                            closeOnSelect={!this.state.depSelect.stayOpen}
                            disabled={this.state.depSelect.disabled}
                            multi
                            onChange={this.handleSelectDepartChange.bind(this)}
                            options={depDays}
                            placeholder="Departure days"
                            simpleValue
                            value={this.state.depSelect.depValue}
                        />
                        <TimePicker style={{width: 50}}
                                    defaultValue={null}
                                    showSecond={false}
                                    onChange={this.onDepTimeChange.bind(this)}
                        />
                        <Select
                            closeOnSelect={!this.state.arrSelect.stayOpen}
                            disabled={this.state.arrSelect.disabled}
                            multi
                            onChange={this.handleSelectArriveChange.bind(this)}
                            options={arrDays}
                            placeholder="Arrival days"
                            simpleValue
                            value={this.state.arrSelect.arrValue}
                        />
                        <TimePicker
                            style={{width: 50}}
                            defaultValue={null}
                            showSecond={false}
                            onChange={this.onArrTimeChange.bind(this)}
                        />

                        <button type="submit">Save</button>
                    </form>

                    <table>
                        <thead>
                        <tr>
                            <th>Station</th>
                            <th>Arrival days</th>
                            <th>Arrival time</th>
                            <th>Departure days</th>
                            <th>Departure time</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.props.trainReducer.route
                            .sort((a, b) => {
                                if (a.departureTime === null) a.departureTime = 0;
                                return a.departureTime > b.departureTime;
                            }).map((route, index) => {
                                    let depHour;
                                    let depMinute;
                                    if (route.departureTime === null) {
                                        depHour = '';
                                        depMinute = '';
                                    } else {
                                        depHour = route.departureTime[0];
                                        depMinute = route.departureTime[1];
                                    }
                                    if(depHour.toString().length === 1) depHour = '0' + depHour;
                                    if(depMinute.toString().length === 1) depMinute = '0' + depMinute;

                                    let arrHour;
                                    let arrMinute;
                                    if (route.arrivalTime === null) {
                                        arrHour = '';
                                        arrMinute = '';
                                    } else {
                                        arrHour = route.arrivalTime[0];
                                        arrMinute = route.arrivalTime[1];
                                    }
                                    if(arrHour.toString().length === 1) arrHour = '0' + arrHour;
                                    if(arrMinute.toString().length === 1) arrMinute = '0' + arrMinute;

                                    return <tr key={index}>
                                        <td>{route.station.title}</td>
                                        <td>{route.arrivePeriod}</td>
                                        <td>{arrHour} {arrHour === '' ? '' : ':'} {arrMinute}</td>
                                        <td>{route.departPeriod}</td>
                                        <td>{depHour} {depHour === '' ? '' : ':'} {depMinute}</td>
                                    </tr>
                                }
                            )}
                        </tbody>
                    </table>
                    <button type="button" onClick={this.handleCloseRouteModal.bind(this)}>Cancel</button>
                </ReactModal>
            </div>
        );
    }
}