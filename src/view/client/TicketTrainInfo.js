import React, {Component} from 'react';
import '../css/TicketTrainInfo.css';
import {Button, Modal} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import '../css/DatePicker.css';
import moment from 'moment';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles-compiled.css';
import 'react-credit-cards/lib/styles.scss';
import 'react-credit-cards/src/styles.scss';
import '../css/CreditCard.css';
import { auth } from './constants/firebase';

export default class TicketTrainInfo extends Component {

    constructor() {
        super();
        this.state = {
            birthday: moment(),
            firstName: '',
            lastName: '',
            showPayModal: false,
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            focused: ''
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
            birthday: date
        });
    }

    payment(event) {
        event.preventDefault();
        this.setState({showPayModal: true})
    }

    pay(event) {
        event.preventDefault();
        this.props.ticketActions.buyTicket({
            passenger: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthday: [
                    this.state.birthday._d.getFullYear(),
                    this.state.birthday._d.getMonth() + 1,
                    this.state.birthday._d.getDate()
                ]
            },
            creditCard: {
                number: this.state.number,
                name: this.state.name,
                expiry: this.state.expiry,
                cvc: this.state.cvc,
            },
            trainWrapper: this.props.ticketReducer.train,
            userEmail: auth.currentUser.email
        })
    }

    handleInputFocus = (event) => {
        const target = event.target;

        this.setState({
            focused: target.name,
        });
    };

    onCardInputChange = (event) => {
        const target = event.target;

        if (target.name === 'number') {
            if (target.value.length <= 16) {
                this.setState({
                    [target.name]: target.value.replace(/ /g, ''),
                });
            }
        }
        if (target.name === 'cvc') {
            if (target.value.length <= 3) {
                this.setState({
                    [target.name]: target.value.replace(/ /g, ''),
                });
            }
        }
        else if (target.name === 'expiry') {
            if (target.value.length <= 4) {
                this.setState({
                    [target.name]: target.value.replace(/ |\//g, ''),
                });
            }
        }
        else {
            this.setState({
                [target.name]: target.value,
            });
        }
    };

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

        const {name, number, expiry, cvc, focused} = this.state;

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
                        Departure date: {depDay}{'.'}{depMonth}{'.'}{this.props.ticketReducer.train.departDate[0]}
                        Arrival date: {arrDay}{'.'}{arrMonth}{'.'}{this.props.ticketReducer.train.arriveDate[0]}
                    </div>

                    <div className="info">
                        Departure time: {depHour}{depHour === '' ? '' : ':'}{depMinute}
                        Arrival time: {arrHour}{arrHour === '' ? '' : ':'}{arrMinute}
                    </div>

                    <div className="info">
                        Price: {this.props.ticketReducer.train.price}{' $'}
                    </div>
                </strong>

                <div className="pas-form">
                    <form onSubmit={this.payment.bind(this)}>
                        <label>First Name</label>
                        <input className="pas-data-input" type="text" placeholder="First Name"
                               onChange={this.onFirstNameChange.bind(this)}/>


                        <label>Last Name</label>
                        <input className="pas-data-input" type="text" placeholder="Last Name"
                               onChange={this.onLastNameChange.bind(this)}/>

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

                <Modal
                    show={this.state.showPayModal}
                    onHide={() => this.setState({showPayModal: false})}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Body>
                        <div className="pay-form">
                            <div className="card">
                                <Cards
                                    number={number}
                                    name={name}
                                    expiry={expiry}
                                    cvc={cvc}
                                    focused={focused}
                                />
                            </div>

                            <div className="card-form">
                                <form>
                                    <div>
                                        <input
                                            className="card-number"
                                            type="tel"
                                            name="number"
                                            placeholder="Card Number"
                                            onKeyUp={this.onCardInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            className="card-name"
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            onKeyUp={this.onCardInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            className="card-expiry"
                                            type="tel"
                                            name="expiry"
                                            placeholder="Valid Thru"
                                            onKeyUp={this.onCardInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                        <input
                                            className="card-cvc"
                                            type="tel"
                                            name="cvc"
                                            placeholder="CVC"
                                            onKeyUp={this.onCardInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </div>

                                    <div>
                                        <Button className="pay-btn" onClick={this.pay.bind(this)}>Pay</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}