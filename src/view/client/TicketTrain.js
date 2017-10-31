import React, {Component} from 'react';
import '../css/TicketTrain.css';
import {Button, Col, Glyphicon, Grid, Jumbotron, Row} from "react-bootstrap";
import ReactTable from "react-table";
import {push} from 'connected-react-router';
import store from './store/configStore';

export default class TicketTrain extends Component {

    trainInfo(train){
        this.props.ticketActions.setTrain(train);
        this.props.ticketActions.setWaypoint(train.route);
        store.dispatch(push('/rws/client/tickets/trains/info'));
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="ticket-train-jum">
                            <div className="align-center">
                                <ReactTable
                                    data={this.props.ticketReducer.trains}
                                    filterable={false}
                                    sortarable={false}
                                    columns={[
                                        {
                                            Header: () => {
                                                let day = this.props.ticketReducer.trainInfo.departDate[2];
                                                let month = this.props.ticketReducer.trainInfo.departDate[1];

                                                if (day < 10) day = '0' + day;
                                                if (month < 10) month = '0' + month;

                                                return <div className="info-label">
                                                    <h3>
                                                        <strong>
                                                            {this.props.ticketReducer.trainInfo.stationFrom.title} {' - '}
                                                            {this.props.ticketReducer.trainInfo.stationTo.title}{', '}
                                                            {day}{'.'}{month}{'.'}{this.props.ticketReducer.trainInfo.departDate[0]}
                                                        </strong>
                                                    </h3>
                                                </div>
                                            },
                                            columns: [
                                                {
                                                    Header: () => <strong>Train Number</strong>,
                                                    accessor: 'train.number'
                                                },
                                                {
                                                    Header: () => <strong>Departure time</strong>,
                                                    accessor: (schedule) => {
                                                        let depHour;
                                                        let depMinute;
                                                        if (schedule.departTime === null) {
                                                            depHour = '';
                                                            depMinute = '';
                                                        } else {
                                                            depHour = schedule.departTime[0];
                                                            depMinute = schedule.departTime[1];
                                                        }
                                                        if (depHour.toString().length === 1) depHour = '0' + depHour;
                                                        if (depMinute.toString().length === 1) depMinute = '0' + depMinute;

                                                        return <div>{depHour} {depHour === '' ? '' : ':'} {depMinute}</div>
                                                    },
                                                    id: 'departTime'
                                                },
                                                {
                                                    Header: () => <strong>Seats</strong>,
                                                    accessor: 'seats'
                                                },
                                                {
                                                    Header: () => <strong>Price ($)</strong>,
                                                    accessor: 'price'
                                                },
                                                {
                                                    Header: '',
                                                    accessor: (train) =>
                                                        <Button bsSize="xsmall" className="buy-btn"
                                                            onClick={this.trainInfo.bind(this, train)}
                                                        >
                                                            <Glyphicon glyph="usd"/> Buy
                                                        </Button>,
                                                    id: 'id',
                                                    filterable: false,
                                                    sortable: false
                                                }
                                            ]
                                        }
                                    ]}
                                    pageSize={this.props.ticketReducer.trains.length}
                                    showPagination={false}
                                />
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        );
    }
}