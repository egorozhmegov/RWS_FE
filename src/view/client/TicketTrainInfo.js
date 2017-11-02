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
            exp: '',
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

    pay(event){
        event.preventDefault();
        console.log("pay")
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
            if(target.value.length <= 16){
                this.setState({
                    [target.name]: target.value.replace(/ /g, ''),
                });
            }
        }
        if (target.name === 'cvc') {
            if(target.value.length <= 3){
                this.setState({
                    [target.name]: target.value.replace(/ /g, ''),
                });
            }
        }
        else if (target.name === 'expiry') {
            if(target.value.length <= 4){
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
        let day = this.props.ticketReducer.trainInfo.departDate[2];
        let month = this.props.ticketReducer.trainInfo.departDate[1];
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

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
                        Departure date: {day}{'.'}{month}{'.'}{this.props.ticketReducer.trainInfo.departDate[0]}
                    </div>

                    <div className="info">
                        Departure time: {depHour}{depHour === '' ? '' : ':'}{depMinute}
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