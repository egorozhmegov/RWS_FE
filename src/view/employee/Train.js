import React, {Component} from 'react';
import ReactModal from 'react-modal';
import '../css/Timepicker.css';
import '../css/SelectInput.css';
import '../css/RoutePointModal.css';
import '../css/Train.css';
import TimePicker from 'rc-time-picker';
import Select from 'react-select';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Pagination.css';
import Pagination from 'rc-pagination';
import en_GB from "rc-pagination/es/locale/en_GB";

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
            },
            timeArrPicker: null,
            timeDepPicker: null,
            currentPage: 1,
            trainsPerPage: 8
        };
    }


    onPageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    handleOpenRouteModal(id, number) {
        this.setState({
            showRouteModal: true,
            train: {
                id: id,
                number: number
            }
        });
    }

    handleCloseRouteModal() {
        this.stationInput.value = '';
        this.setState({
            showRouteModal: false,
            train: {
                id: ''
            },
            departPeriod: '',
            arrivePeriod: '',
            arrSelect: {
                disabled: false,
                stayOpen: false,
                arrValue: []
            },
            depSelect: {
                disabled: false,
                stayOpen: false,
                arrValue: []
            },
            timeArrPicker: null,
            timeDepPicker: null
        });
        this.props.trainReducer.route = [];
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

    deleteRoutePoint(trainId, stationTitle) {
        this.props.trainActions.deleteRoutePoint(
            {
                train: {
                    id: trainId
                },
                station: {
                    title: stationTitle
                }
            });

    }

    getRoute(id, number) {
        this.props.trainActions.getRoute(id);
        this.handleOpenRouteModal(id, number);
    }

    addRoutePoint(event) {
        event.preventDefault();
        this.props.trainActions.addRoutePoint({
            departureTime: this.state.departureTime.hour === '' ? null : [
                parseInt(this.state.departureTime.hour, 10),
                parseInt(this.state.departureTime.minute, 10)
            ],
            arrivalTime: this.state.arrivalTime.hour === '' ? null : [
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
            arrivePeriod: '',
            arrSelect: {
                disabled: false,
                stayOpen: false,
                arrValue: []
            },
            depSelect: {
                disabled: false,
                stayOpen: false,
                arrValue: []
            },
            timeArrPicker: null,
            timeDepPicker: null
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

    weekDaysNumber(day) {
        switch (day) {
            case "sun":
                return 1;
            case "mon":
                return 2;
            case "tue":
                return 3;
            case "wed":
                return 4;
            case "thu":
                return 5;
            case "fri":
                return 6;
            case "sat":
                return 7;
            default:
                return 0;
        }
    }

    render() {
        let depDays = days;
        let arrDays = days;

        const indexOfLastTrain = this.state.currentPage * this.state.trainsPerPage;
        const indexOfFirstTrain = indexOfLastTrain - this.state.trainsPerPage;
        const currentTrains = this.props.trainReducer.trains.slice(indexOfFirstTrain, indexOfLastTrain);

        return (
            <div>
                <Container className="trains">
                    <Row>
                        <Col sm={6}>
                            <div>
                                <h2>Trains</h2>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Tariff ($)</th>
                                        <th>
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {currentTrains.map((train, index) =>
                                        <tr key={index}>
                                            <td>{train.number}</td>
                                            <td>{train.tariff}</td>
                                            <td>
                                                <button className="remove-train-btn"
                                                        onClick={this.deleteTrain.bind(this, train.id)}>Remove
                                                </button>
                                            </td>
                                            <td>
                                                <button className="get-route-btn"
                                                        onClick={this.getRoute.bind(this, train.id, train.number)}>Route
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>

                                <ReactModal
                                    isOpen={this.state.showRouteModal}
                                    contentLabel="showRouteModal"
                                >
                                    <Container>
                                        <Row>
                                            <Col sm={9} className="route">
                                                <div><h3>Route of train {this.state.train.number}</h3></div>

                                                <table className="route-table">
                                                    <thead>
                                                    <tr>
                                                        <th>Station</th>
                                                        <th>Arrival days</th>
                                                        <th>Arrival time</th>
                                                        <th>Departure days</th>
                                                        <th>Departure time</th>
                                                        <th></th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    {this.props.trainReducer.route
                                                        .sort((a, b) => {
                                                            let dayA = this.weekDaysNumber(a.arrivePeriod.split(',')[0]);
                                                            let dayB = this.weekDaysNumber(b.arrivePeriod.split(',')[0]);
                                                            let aHour = a.arrivalTime === null ? 0 : a.arrivalTime[0];
                                                            let aMinute = a.arrivalTime === null ? 0 : a.arrivalTime[1];
                                                            let bHour = b.arrivalTime === null ? 0 : b.arrivalTime[0];
                                                            let bMinute = b.arrivalTime === null ? 0 : b.arrivalTime[1];
                                                            if (dayA === dayB) {
                                                                if (aHour === bHour) {
                                                                    return aMinute > bMinute;
                                                                } else {
                                                                    return aHour > bHour;
                                                                }
                                                            } else {
                                                                return dayA > dayB;
                                                            }
                                                        })
                                                        .map((route, index) => {
                                                                let depHour;
                                                                let depMinute;
                                                                if (route.departureTime === null) {
                                                                    depHour = '';
                                                                    depMinute = '';
                                                                } else {
                                                                    depHour = route.departureTime[0];
                                                                    depMinute = route.departureTime[1];
                                                                }
                                                                if (depHour.toString().length === 1) depHour = '0' + depHour;
                                                                if (depMinute.toString().length === 1) depMinute = '0' + depMinute;

                                                                let arrHour;
                                                                let arrMinute;
                                                                if (route.arrivalTime === null) {
                                                                    arrHour = '';
                                                                    arrMinute = '';
                                                                } else {
                                                                    arrHour = route.arrivalTime[0];
                                                                    arrMinute = route.arrivalTime[1];
                                                                }
                                                                if (arrHour.toString().length === 1) arrHour = '0' + arrHour;
                                                                if (arrMinute.toString().length === 1) arrMinute = '0' + arrMinute;

                                                                return <tr key={index}>
                                                                    <td>{route.station.title}</td>
                                                                    <td>{route.arrivePeriod}</td>
                                                                    <td>{arrHour} {arrHour === '' ? '' : ':'} {arrMinute}</td>
                                                                    <td>{route.departPeriod}</td>
                                                                    <td>{depHour} {depHour === '' ? '' : ':'} {depMinute}</td>
                                                                    <td>
                                                                        <button className="remove-route-point-btn"
                                                                                onClick={this.deleteRoutePoint.bind(this, route.train.id, route.station.title)}>
                                                                            Remove
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </Col>


                                            <Col sm={3}>
                                                <div className="close-btn">
                                                    <button type="button" onClick={this.handleCloseRouteModal.bind(this)}>
                                                        X
                                                    </button>
                                                </div>

                                                <div className="route-point-form">
                                                    <form onSubmit={this.addRoutePoint.bind(this)}>
                                                        <div><h3>New route point</h3></div>

                                                        <div>Station</div>
                                                        <input className="station-input" type="text" placeholder="Station"
                                                               ref={(input) => {
                                                                   this.stationInput = input
                                                               }}/>

                                                        <div>Arrival days</div>
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

                                                        <div>Arrival time</div>
                                                        <TimePicker
                                                            style={{width: 50}}
                                                            defaultValue={this.state.timeArrPicker}
                                                            showSecond={false}
                                                            onChange={this.onArrTimeChange.bind(this)}
                                                        />

                                                        <div>Departure days</div>
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

                                                        <div>Departure time</div>
                                                        <TimePicker style={{width: 50}}
                                                                    defaultValue={this.state.timeDepPicker}
                                                                    showSecond={false}
                                                                    onChange={this.onDepTimeChange.bind(this)}
                                                        />

                                                        <div>
                                                            <button className="route-point-btn" type="submit">Save</button>
                                                        </div>
                                                    </form>
                                                    <h4 className="route-success-message">{this.props.trainReducer.addRoutePointSuccessMessage}</h4>
                                                    <h4 className="route-error-message">{this.props.trainReducer.addRoutePointErrorMessage}</h4>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>

                                </ReactModal>
                            </div>
                        </Col>

                        <Col sm={1}></Col>

                        <Col sm={5}>
                            <div><h2>New train</h2></div>

                            <form className="add-train-form" onSubmit={this.addTrain.bind(this)}>
                                <div>Number</div>
                                <input className="add-train-input" type="text" placeholder="Number" ref={(input) => {
                                    this.trainNumberInput = input
                                }}/>
                                <div>Tariff</div>
                                <input className="add-train-input" type="text" placeholder="Tariff" ref={(input) => {
                                    this.tariffInput = input
                                }}/>

                                <button className="add-train-btn" type="submit">Save</button>
                            </form>
                            <h4 className="train-success-message">{this.props.trainReducer.addTrainSuccessMessage}</h4>
                            <h4 className="train-error-message">{this.props.trainReducer.addTrainErrorMessage}</h4>
                        </Col>
                    </Row>
                </Container>

                <Pagination className="pagination"
                            onChange={this.onPageChange}
                            locale={en_GB}
                            current={this.state.currentPage}
                            pageSize={8}
                            total={this.props.trainReducer.trains.length}/>
            </div>
        );
    }
}