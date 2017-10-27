import React, {Component} from 'react';
import '../css/Timepicker.css';
import '../css/SelectInput.css';
import '../css/RoutePointModal.css';
import '../css/Train.css';
import *as trainActions from './actions/trainActions';
import TimePicker from 'rc-time-picker';
import Select from 'react-select';
import '../css/Pagination.css';
import {Button, Col, Glyphicon, Grid, Jumbotron, Modal, Row} from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Textfield} from 'react-mdc-web/lib';

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
            showDeleteDialog: false,
            showAddDialog: false,
            number: '',
            tariff: '',
            validNumber: false,
            validTrain: false,
            showRouteModal: false,
            showAddRoutePointDialog: false,
            showDeleteRoutePointDialog: false,
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
            stSelect: {
                disabled: false,
                stayOpen: false,
                stValue: ''
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
            station:''
        }
    }

    componentWillMount(){
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
            stSelect: {
                disabled: false,
                stayOpen: false,
                stValue: ''
            },
            timeArrPicker: null,
            timeDepPicker: null
        });
    }

    addTrain(event) {
        event.preventDefault();
        this.props.trainActions.addTrain({
            number: this.state.number,
            tariff: this.state.tariff,
        });

        this.setState({
            number: '',
            tariff: ' '
        })
    }

    deleteTrain(id) {
        this.props.trainActions.deleteTrain(id);
        this.setState({showDeleteDialog: false})
    }

    onNumberChange(event) {
        trainActions.setAddTrainErrorMessage('');
        this.setState({
            number: event.target.value,
            validNumber: !event.target.value.trim().length > 0
        })
    }

    onTariffChange(event) {
        this.setState({
            tariff: event.target.value,
            validTariff: !event.target.value.trim().match(/^\d+$/)
        })
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
        this.setState({showDeleteRoutePointDialog: false})
    }

    getRoute(train) {
        this.props.trainActions.getRoute(train.id);
        this.handleOpenRouteModal(train);
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
                title: this.state.stSelect.stValue
            }
        });
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

    onSearchInputChange(event){
        let updatedList = this.props.trainReducer.filterTrains;
        updatedList = updatedList.filter(function(item){
            return (item.number.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1);
        });
        this.props.trainActions.filter(updatedList);
    }

    onSelectStationChange(value){
        this.setState({
            stSelect: {
                stValue: value
            }
        });
    }

    handleOpenRouteModal(train) {
        this.setState({
            showRouteModal: true,
            train: train
        });
    }

    handleCloseRouteModal() {
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
            stSelect: {
                disabled: false,
                stayOpen: false,
                stValue: ''
            },
            timeArrPicker: null,
            timeDepPicker: null,
        });
        this.props.trainReducer.route = [];
    }

    render() {
        let depDays = days;
        let arrDays = days;

        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="train-jum">
                            <div className="align-center">
                                <ReactTable
                                    data={this.props.trainReducer.trains}
                                    filterable
                                    columns={[
                                        {
                                            Header: () => <h3><strong className="tab-header">Trains</strong></h3>,
                                            columns: [
                                                {
                                                    Header: () => <strong>Number</strong>,
                                                    accessor: 'number',

                                                },
                                                {
                                                    Header: () => <strong>Tariff ($)</strong>,
                                                    accessor: 'tariff'
                                                },
                                                {
                                                    Header: '',
                                                    accessor: (train) =>
                                                        <Button bsSize="small" className="delete-btn" onClick={() => {
                                                            this.setState({
                                                                showDeleteDialog: true,
                                                                train: train
                                                            })
                                                        }}>
                                                            <Glyphicon glyph="trash"/>
                                                        </Button>,
                                                    id: 'delete-id',
                                                    filterable: false,
                                                    sortable: false
                                                },
                                                {
                                                    Header: () =>
                                                        <Button className="add-btn" bsSize="xsmall"
                                                                onClick={() => {
                                                                    this.setState({
                                                                        showAddDialog: true,
                                                                        number: '',
                                                                        tariff: ''
                                                                    });
                                                                    trainActions.setAddTrainErrorMessage('');
                                                                }}>
                                                            <Glyphicon glyph="plus-sign"/>
                                                        </Button>,
                                                    accessor: (train) =>
                                                        <Button bsSize="small" className="route-btn"
                                                                onClick={this.getRoute.bind(this, train)}
                                                        >
                                                            <Glyphicon glyph="road"/> Route
                                                        </Button>,
                                                    id: 'route-id',
                                                    filterable: false,
                                                    sortable: false
                                                }
                                            ]
                                        }
                                    ]}
                                    defaultPageSize={6}
                                    pageSizeOptions={[6, 12, 18, 24, 30]}
                                    className="-striped -highlight"
                                />
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>

                <Modal
                    bsSize="small"
                    show={this.state.showDeleteDialog}
                    onHide={() => this.setState({showDeleteDialog: false})}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Body>
                        <div className="dialog-body">
                            <strong>{'Are yor sure delete the train ' + this.state.train.number + '?'}</strong>
                            <div>
                                <Button bsSize="small" className="no-btn"
                                        onClick={() => this.setState({showDeleteDialog: false})}>No</Button>
                                <Button bsSize="small" className="yes-btn"
                                        onClick={this.deleteTrain.bind(this, this.state.train.id)}>Yes</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal
                    bsSize="small"
                    show={this.state.showAddDialog}
                    onHide={() => this.setState({showAddDialog: false})}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header>
                        <Modal.Title><strong>New train</strong></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className="add-form" onSubmit={this.addTrain.bind(this)}>
                            <Textfield className="add-input"
                                       floatingLabel="Number"
                                       type="text"
                                       useInvalidProp
                                       invalid={this.state.validNumber}
                                       value={this.state.number}
                                       required
                                       helptext="Must not be empty"
                                       helptextValidation
                                       onChange={this.onNumberChange.bind(this)}
                            />

                            <Textfield className="add-input"
                                       floatingLabel="Tariff"
                                       type="text"
                                       useInvalidProp
                                       invalid={this.state.validTariff}
                                       value={this.state.tariff}
                                       required
                                       helptext="Must not be empty"
                                       helptextValidation
                                       onChange={this.onTariffChange.bind(this)}
                            />
                            <h4 className="route-error-message">{this.props.trainReducer.addTrainErrorMessage}</h4>
                            <Button className="add-submit-btn" type="submit">Add</Button>
                        </form>
                    </Modal.Body>
                </Modal>

                <div className="route-point-dialog">
                    <Modal
                        bsSize="lg"
                        show={this.state.showRouteModal}
                        onHide={() => this.setState({showRouteModal: false})}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Body>
                            <h3>Route of train {this.state.train.number}</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Station</th>
                                    <th>Arrival days</th>
                                    <th>Arrival time</th>
                                    <th>Departure days</th>
                                    <th>Departure time</th>
                                    <th><Button className="add-route-point-btn" bsSize="small"
                                                onClick={() => {
                                                    this.setState({
                                                        showAddRoutePointDialog: true
                                                    });
                                                    trainActions.setAddRoutePointErrorMessage('');
                                                }}>
                                        <Glyphicon glyph="plus-sign"/>
                                    </Button></th>
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
                                                    <Button bsSize="small" className="delete-btn"
                                                            onClick={() => {
                                                                this.setState({
                                                                    showDeleteRoutePointDialog: true,
                                                                    train: route.train,
                                                                    station: route.station.title
                                                                })
                                                            }}
                                                    >
                                                        <Glyphicon glyph="trash"/>
                                                    </Button>
                                                </td>
                                            </tr>
                                        }
                                    )}
                                </tbody>
                            </table>
                        </Modal.Body>
                    </Modal>
                </div>

                <Modal
                    bsSize="small"
                    show={this.state.showAddRoutePointDialog}
                    onHide={() => this.setState({showAddRoutePointDialog: false})}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header>
                        <Modal.Title><strong>New route point</strong></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <form onSubmit={this.addRoutePoint.bind(this)}>
                                <Select className="select-station"
                                        closeOnSelect={!this.state.stSelect.stayOpen}
                                        disabled={this.state.stSelect.disabled}
                                        onChange={this.onSelectStationChange.bind(this)}
                                        options={this.props.trainReducer.stations.map((station, index) => {
                                            return {label: station.title, value: station.title}
                                        })}
                                        placeholder="Station"
                                        simpleValue
                                        value={this.state.stSelect.stValue}
                                />

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

                                <h4 className="route-error-message">{this.props.trainReducer.addRoutePointErrorMessage}</h4>

                                <div>
                                    <Button bsSize="small" className="add-submit-btn" type="submit">Save</Button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal
                    bsSize="small"
                    show={this.state.showDeleteRoutePointDialog}
                    onHide={() => this.setState({showDeleteRoutePointDialog: false})}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Body>
                        <div className="dialog-body">
                            <strong>{'Are yor sure delete the station ' + this.state.station + '?'}</strong>
                            <div>
                                <Button bsSize="small" className="no-btn"
                                        onClick={() => this.setState({
                                            showDeleteRoutePointDialog: false,
                                            train: {},
                                            station: ''
                                        })}>No</Button>
                                <Button bsSize="small" className="yes-btn"
                                        onClick={this.deleteRoutePoint.bind(this, this.state.train.id, this.state.station)}>Yes</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Grid>


        )
    }
}