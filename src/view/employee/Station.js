import React, {Component} from 'react';
import '../css/Station.css';
import '../css/Pagination.css';
import {Button, Glyphicon, Modal} from "react-bootstrap";
import ReactTable from "react-table";
import *as stationActions from './actions/stationActions';
import {Textfield} from 'react-mdc-web/lib';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

export default class Station extends Component {
    constructor() {
        super();
        this.state = {
            showDeleteDialog: false,
            showAddDialog: false,
            title: '',
            validTitle: false,
            station: {},
            address: {}
        }
    }


    deleteStation(station) {
        this.props.stationActions.deleteStation(station.id);
        this.setState({showDeleteDialog: false})
    }

    addStation(event) {
        event.preventDefault();
        this.props.stationActions.addStation({
            title: this.state.title,
        });
        this.setState({title: ''})
    }

    onTitleChange(event) {
        stationActions.setAddStationErrorMessage('');
        this.setState({
            title: event.target.value,
            validTitle: !event.target.value.trim().length > 0
        })
    }

    onTest() {
        geocodeByAddress('St.Petersburg')
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) => console.log('Successfully got latitude and longitude', {lat, lng}))
    }

    render() {
        return (
            <div>
                <div className="align-center">
                    <ReactTable
                        data={this.props.stationReducer.stations}
                        filterable
                        columns={[
                            {
                                Header: () => <h3><strong className="tab-header">Stations</strong></h3>,
                                columns: [
                                    {
                                        Header: () => <strong>Title</strong>,
                                        accessor: 'title',
                                    }
                                    ,
                                    {
                                        Header: () =>
                                            <Button className="add-btn" bsSize="small"
                                                    onClick={() => {
                                                        this.setState({
                                                            showAddDialog: true,
                                                            title: ''
                                                        });
                                                        stationActions.setAddStationErrorMessage('');
                                                    }}>
                                                <Glyphicon glyph="plus-sign"/>
                                            </Button>,
                                        accessor: (station) =>
                                            <Button bsSize="small" className="delete-btn" onClick={() => {
                                                this.setState({
                                                    showDeleteDialog: true,
                                                    station: station
                                                })
                                            }}>
                                                <Glyphicon glyph="trash"/>
                                            </Button>,
                                        id: 'delete-id',
                                        filterable: false,
                                        sortable: false
                                    }
                                ]
                            }
                        ]}
                        getTdProps={(rowInfo,instance) => {
                            return {
                                onClick: (e, handleOriginal) => {
                                    console.log('row:', instance.original);

                                    if (handleOriginal) {
                                        handleOriginal()
                                    }
                                }
                            }
                        }}
                        defaultPageSize={5}
                        pageSizeOptions={[5, 10, 15, 20, 25]}
                        className="-striped -highlight"
                    />
                </div>

                <Modal
                    bsSize="small"
                    show={this.state.showAddDialog}
                    onHide={() => this.setState({showAddDialog: false})}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header>
                        <Modal.Title><strong className="add-station-header">New station</strong></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className="add-station-form" onSubmit={this.addStation.bind(this)}>
                            <Textfield className="add-input"
                                       floatingLabel="Station"
                                       type="text"
                                       useInvalidProp
                                       invalid={this.state.validTitle}
                                       value={this.state.title}
                                       required
                                       helptext="Must not be empty"
                                       helptextValidation
                                       onChange={this.onTitleChange.bind(this)}
                            />
                            <h4 className="station-error-message">{this.props.stationReducer.addStationErrorMessage}</h4>
                            <Button className="add-submit-btn" type="submit">Add</Button>
                        </form>
                    </Modal.Body>
                </Modal>

                <Modal
                    bsSize="small"
                    show={this.state.showDeleteDialog}
                    onHide={() => this.setState({
                        showDeleteDialog: false,
                        station: {}
                    })}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Body>
                        <div className="dialog-body">
                            <strong>{'Are yor sure delete the station ' + this.state.station.title + '?'}</strong>
                            <div>
                                <Button bsSize="small" className="no-btn"
                                        onClick={() => this.setState({
                                            showDeleteDialog: false,
                                            station: {}
                                        })}>No</Button>
                                <Button bsSize="small" className="yes-btn"
                                        onClick={this.deleteStation.bind(this, this.state.station)}>Yes</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}