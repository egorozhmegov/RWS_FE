import React, {Component} from 'react';
import '../css/Passenger.css';
import {Col, Grid, Jumbotron, Row} from "react-bootstrap";
import ReactTable from "react-table";

export default class Passenger extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="passenger-jum">
                            <div className="align-center">
                                <ReactTable
                                    data={this.props.passengerReducer.passengers}
                                    filterable
                                    columns={[
                                        {
                                            Header: () => <h3><strong className="tab-header">Passengers</strong></h3>,
                                            columns: [
                                                {
                                                    Header: () => <strong>First Name</strong>,
                                                    accessor: 'passengerFirstName',

                                                },
                                                {
                                                    Header: () => <strong>Last Name</strong>,
                                                    accessor: 'passengerLastName'
                                                },
                                                {
                                                    Header: () => <strong>Birthday</strong>,
                                                    accessor: (passenger) => {
                                                        let birthday;
                                                        let birthmonth;
                                                        let birthyear;

                                                        birthyear = passenger.birthday[0];
                                                        birthmonth = passenger.birthday[1];
                                                        if (birthmonth.toString().length === 1) birthmonth = '0' + birthmonth;
                                                        birthday = passenger.birthday[2];
                                                        if (birthday.toString().length === 1) birthday = '0' + birthday;


                                                        return <div>{birthday}.{birthmonth}.{birthyear}</div>
                                                    },
                                                    id: 'passenger.birthday',
                                                    filterable: false
                                                },
                                                {
                                                    Header: () => <strong>Train</strong>,
                                                    accessor: 'train.number'
                                                },
                                                {
                                                    Header: () => <strong>Station</strong>,
                                                    accessor: 'station.title'
                                                },
                                                {
                                                    Header: () => <strong>Date</strong>,
                                                    accessor: (passenger) => {
                                                        let departday;
                                                        let departmonth;
                                                        let departyear;

                                                        departyear = passenger.trainDate[0];
                                                        departmonth = passenger.trainDate[1];
                                                        if (departmonth.toString().length === 1) departmonth = '0' + departmonth;
                                                        departday = passenger.trainDate[2];
                                                        if (departday.toString().length === 1) departday = '0' + departday;

                                                        return <div>{departday}.{departmonth}.{departyear}</div>
                                                    },
                                                    id: 'passenger.trainDate',
                                                    filterable: false
                                                },
                                                {
                                                    Header: () => <strong>Ticket Number</strong>,
                                                    accessor: 'ticket.id'
                                                },
                                                {
                                                    Header: () => <strong>Ticket Price</strong>,
                                                    accessor: 'ticket.ticketPrice'
                                                }
                                            ]
                                        }
                                    ]}
                                    defaultPageSize={8}
                                    pageSizeOptions={[8, 16, 24, 32, 40]}
                                    className="-striped -highlight"
                                />
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        )
    }
}