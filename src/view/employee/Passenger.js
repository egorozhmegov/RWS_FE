import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Passenger.css';
import '../css/Pagination.css';
import Pagination from 'rc-pagination';
import en_GB from "rc-pagination/es/locale/en_GB";

export default class Passenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            passengersPerPage: 9,
            firstName: '',
            lastName: '',
            station: '',
            train: ''
        };
    }

    onPageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    onLastNameInputChange(event){
        let firstName = this.state.firstName;
        let station = this.state.station;
        let train = this.state.train;

        let updatedList = this.props.passengerReducer.passengers;
        updatedList = updatedList.filter(function(item){
            return (item.lastName.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)
                && (item.firstName.toLowerCase().search(
                    firstName.toLowerCase()) !== -1)
                && (item.station.title.toLowerCase().search(
                    station.toLowerCase()) !== -1)
                && (item.train.number.toLowerCase().search(
                    train.toLowerCase()) !== -1);
        });
        this.props.passengerActions.filter(updatedList);
        this.setState({
            lastName: event.target.value
        })
    }

    onFirstNameInputChange(event){
        let lastName = this.state.lastName;
        let station = this.state.station;
        let train = this.state.train;

        let updatedList = this.props.passengerReducer.passengers;
        updatedList = updatedList.filter(function(item){
            return (item.lastName.toLowerCase().search(
                    lastName.toLowerCase()) !== -1)
                && (item.firstName.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)
                && (item.station.title.toLowerCase().search(
                    station.toLowerCase()) !== -1)
                && (item.train.number.toLowerCase().search(
                    train.toLowerCase()) !== -1);
        });
        this.props.passengerActions.filter(updatedList);
        this.setState({
            firstName: event.target.value
        })
    }

    onStationInputChange(event){
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let train = this.state.train;

        let updatedList = this.props.passengerReducer.passengers;
        updatedList = updatedList.filter(function(item){
            return (item.lastName.toLowerCase().search(
                    lastName.toLowerCase()) !== -1)
                && (item.firstName.toLowerCase().search(
                    firstName.toLowerCase()) !== -1)
                && (item.station.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1)
                && (item.train.number.toLowerCase().search(
                    train.toLowerCase()) !== -1);
        });
        this.props.passengerActions.filter(updatedList);
        this.setState({
            station: event.target.value
        })
    }

    onTrainInputChange(event){
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let station = this.state.station;

        let updatedList = this.props.passengerReducer.passengers;
        updatedList = updatedList.filter(function(item){
            return (item.lastName.toLowerCase().search(
                    lastName.toLowerCase()) !== -1)
                && (item.firstName.toLowerCase().search(
                    firstName.toLowerCase()) !== -1)
                && (item.station.title.toLowerCase().search(
                    station.toLowerCase()) !== -1)
                && (item.train.number.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1);
        });
        this.props.passengerActions.filter(updatedList);
        this.setState({
            train: event.target.value
        })
    }

    render() {
        const indexOfLastPassenger = this.state.currentPage * this.state.passengersPerPage;
        const indexOfFirstPassenger = indexOfLastPassenger - this.state.passengersPerPage;
        const currentPassengers = this.props.passengerReducer.filterPassengers.slice(indexOfFirstPassenger, indexOfLastPassenger);

        return (
            <div>
                <Container className="passenger">
                    <Row>
                        <Col sm={12}>
                            <div><h3>Passengers</h3></div>

                            <table>
                                <thead>
                                <tr>
                                    <th>Last Name </th>
                                    <th>First Name</th>
                                    <th>Birthday</th>
                                    <th>Station</th>
                                    <th>Date</th>
                                    <th>Train</th>
                                    <th>Ticket number</th>
                                    <th>Ticket price ($)</th>
                                </tr>
                                </thead>

                                <thead >
                                <tr>
                                    <th className="filter-head">
                                        <input className="search-input" type="text" onChange={this.onLastNameInputChange.bind(this)}/>
                                    </th>

                                    <th className="filter-head">
                                        <input className="search-input" type="text" onChange={this.onFirstNameInputChange.bind(this)}/>
                                    </th>
                                    <th className="filter-head"></th>
                                    <th className="filter-head">
                                        <input className="search-input" type="text" onChange={this.onStationInputChange.bind(this)}/>
                                    </th>
                                    <th className="filter-head"></th>
                                    <th className="filter-head">
                                        <input className="search-input" type="text" onChange={this.onTrainInputChange.bind(this)}/>
                                    </th>
                                    <th className="filter-head"></th>
                                    <th className="filter-head"></th>
                                </tr>
                                </thead>

                                <tbody>
                                {currentPassengers.map((passenger, index) => {
                                        let birthday;
                                        let birthmonth;
                                        let birthyear;

                                        birthyear = passenger.birthday[0];
                                        birthmonth = passenger.birthday[1];
                                        if (birthmonth.toString().length === 1) birthmonth = '0' + birthmonth;
                                        birthday = passenger.birthday[2];
                                        if (birthday.toString().length === 1) birthday = '0' + birthday;

                                        let departday;
                                        let departmonth;
                                        let departyear;

                                        departyear = passenger.trainDate[0];
                                        departmonth = passenger.trainDate[1];
                                        if (departmonth.toString().length === 1) departmonth = '0' + departmonth;
                                        departday = passenger.trainDate[2];
                                        if (departday.toString().length === 1) departday = '0' + departday;

                                        return <tr key={index}>
                                            <td>{passenger.lastName}</td>
                                            <td>{passenger.firstName}</td>
                                            <td>{birthday}.{birthmonth}.{birthyear}</td>
                                            <td>{passenger.station.title}</td>
                                            <td>{departday}.{departmonth}.{departyear}</td>
                                            <td>{passenger.train.number}</td>
                                            <td>{passenger.ticket.id}</td>
                                            <td>{passenger.ticket.ticketPrice}</td>
                                        </tr>
                                    }
                                )}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>

                <Pagination className="pas-pagination"
                            onChange={this.onPageChange}
                            locale={en_GB}
                            current={this.state.currentPage}
                            pageSize={1}
                            total={this.props.passengerReducer.passengers.length}/>
            </div>
        )
    }
}