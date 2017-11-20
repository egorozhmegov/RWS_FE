import React, {Component} from 'react';
import '../css/TicketTrainInfo.css';
import {Button} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import '../css/DatePicker.css';
import moment from 'moment';
import store from './store/configStore';
import {push} from 'connected-react-router';

export default class TicketTrainInfo extends Component {

    constructor() {
        super();
        this.state = {
            birthday: moment(),
            firstName: '',
            lastName: ''
        }
    }

    onFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    onLastNameChange(event) {
        this.setState({
            lastName: event.target.value
        });
    }

    onBirthdayChange(date) {
        this.setState({
            birthday: date.isBefore(moment()) ? date : moment()
        });
    }

    payment(event) {
        event.preventDefault();
        this.props.ticketActions.setPassenger({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthday: [
                    this.state.birthday._d.getFullYear(),
                    this.state.birthday._d.getMonth() + 1,
                    this.state.birthday._d.getDate()
                ]
            });
        this.props.ticketActions.setErrorPayMessage('');
        this.props.ticketActions.setSuccessPayMessage('');
        store.dispatch(push('/rws/client/tickets/trains/info/payment'));
    }

    render() {
        let depDay = this.props.ticketReducer.train.departDate[2];
        let depMonth = this.props.ticketReducer.train.departDate[1];
        if (depDay < 10) depDay = '0' + depDay;
        if (depMonth < 10) depMonth = '0' + depMonth;

        let arrDay = this.props.ticketReducer.train.arriveDate[2];
        let arrMonth = this.props.ticketReducer.train.arriveDate[1];
        if (arrDay < 10) arrDay = '0' + arrDay;
        if (arrMonth < 10) arrMonth = '0' + arrMonth;

        let depHour;
        let depMinute;
        if (this.props.ticketReducer.train.departTime === null) {
            depHour = '';
            depMinute = '';
        } else {
            depHour = this.props.ticketReducer.train.departTime[0];
            depMinute = this.props.ticketReducer.train.departTime[1];
        }
        if (depHour.toString().length === 1) depHour = '0' + depHour;
        if (depMinute.toString().length === 1) depMinute = '0' + depMinute;

        let arrHour;
        let arrMinute;
        if (this.props.ticketReducer.train.arriveTime === null) {
            arrHour = '';
            arrMinute = '';
        } else {
            arrHour = this.props.ticketReducer.train.arriveTime[0];
            arrMinute = this.props.ticketReducer.train.arriveTime[1];
        }
        if (arrHour.toString().length === 1) arrHour = '0' + arrHour;
        if (arrMinute.toString().length === 1) arrMinute = '0' + arrMinute;

        return (
            <div className="pay-info">
                <strong>
                    <div className="info">
                        Train: {this.props.ticketReducer.trainNumber}
                    </div>

                    <div className="info">
                        Direction: {this.props.ticketReducer.trainInfo.stationFrom.title}{' - '}
                        {this.props.ticketReducer.trainInfo.stationTo.title}
                    </div>

                    <div className="info">
                        Departure: {depDay}{'.'}{depMonth}{'.'}{this.props.ticketReducer.train.departDate[0]}{'  '}
                        {depHour}{depHour === '' ? '' : ':'}{depMinute}
                    </div>

                    <div className="info">
                        Arrival: {arrDay}{'.'}{arrMonth}{'.'}{this.props.ticketReducer.train.arriveDate[0]}{'  '}
                        {arrHour}{arrHour === '' ? '' : ':'}{arrMinute}
                    </div>

                    <div className="info">
                        Price: {this.props.ticketReducer.train.price}{' $'}
                    </div>
                </strong>

                <div className="pas-form">
                    <form onSubmit={this.payment.bind(this)}>
                        <label>First Name</label>
                        <input className="pas-data-input" type="text" placeholder="First Name"
                               onChange={this.onFirstNameChange.bind(this)} required/>


                        <label>Last Name</label>
                        <input className="pas-data-input" type="text" placeholder="Last Name"
                               onChange={this.onLastNameChange.bind(this)} required/>

                        <label>Birthday</label>
                        <DatePicker className="pas-data-input"
                                    selected={this.state.birthday}
                                    onChange={this.onBirthdayChange.bind(this)}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                        />

                        <Button className="payment-btn" type="submit">Payment</Button>
                    </form>
                </div>
            </div>
        )
    }
}