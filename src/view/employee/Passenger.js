import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Passenger.css';
import '../css/Pagination.css';
import Pagination from 'rc-pagination';
import en_GB from "rc-pagination/es/locale/en_GB";

export default class Passenger extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            passengersPerPage: 10
        };
    }

    onPageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    render() {
        const indexOfLastPassenger = this.state.currentPage * this.state.passengersPerPage;
        const indexOfFirstPassenger = indexOfLastPassenger - this.state.passengersPerPage;
        const currentPassengers = this.props.passengerReducer.passengers.slice(indexOfFirstPassenger, indexOfLastPassenger);

        return (
            <div>
                <Container className="passenger">
                    <Row>
                        <Col sm={1}></Col>

                        <Col sm={10}>
                            <div><h3>Passengers</h3></div>

                            <table>
                                <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Birthday</th>
                                    <th>Train</th>
                                    <th>Ticket number</th>
                                    <th>Ticket price ($)</th>
                                </tr>
                                </thead>

                                <tbody>
                                {currentPassengers.map((passenger, index) => {
                                        let day;
                                        let month;
                                        let year;

                                        year = passenger.birthday[0];
                                        month = passenger.birthday[1];
                                        if (month.toString().length === 1) month = '0' + month;
                                        day = passenger.birthday[2];
                                        if (day.toString().length === 1) day = '0' + day;

                                        return <tr key={index}>
                                            <td>{passenger.lastName}</td>
                                            <td>{passenger.firstName}</td>
                                            <td>{day}.{month}.{year}</td>
                                            <td>{passenger.train.number}</td>
                                            <td>{passenger.ticket.id}</td>
                                            <td>{passenger.ticket.ticketPrice}</td>
                                        </tr>
                                    }
                                )}
                                </tbody>
                            </table>
                        </Col>

                        <Col sm={1}></Col>
                    </Row>
                </Container>

                <Pagination className="pagination"
                            onChange={this.onPageChange}
                            locale={en_GB}
                            current={this.state.currentPage}
                            pageSize={10}
                            total={this.props.passengerReducer.passengers.length}/>
            </div>
        )
    }
}