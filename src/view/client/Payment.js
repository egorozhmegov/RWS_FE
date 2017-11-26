import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Row} from "react-bootstrap";
import '../css/Payment.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles-compiled.css';
import 'react-credit-cards/lib/styles.scss';
import 'react-credit-cards/src/styles.scss';
import '../css/CreditCard.css';
import {auth} from './constants/firebase';

export default class Payment extends Component {

    constructor() {
        super();
        this.state = {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            focused: ''
        }
    }

    pay(event) {
        event.preventDefault();
        this.props.ticketActions.buyTicket({
            passenger: this.props.ticketReducer.passenger,
            creditCard: {
                number: this.state.number,
                name: this.state.name,
                expiry: this.state.expiry,
                cvc: this.state.cvc,
            },
            trainWrapper: this.props.ticketReducer.train,
            userEmail: auth.currentUser.email
        });
        this.props.ticketActions.setSuccessPayMessage('Loading ...');
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
        const {name, number, expiry, cvc, focused} = this.state;

        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={6} md={12}>
                            <Jumbotron className="payment-jum">
                                <Row>
                                    <Col xs={6} md={12}>
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
                                                <form onSubmit={this.pay.bind(this)}>
                                                    <div>
                                                        <input
                                                            className="card-number"
                                                            type="tel"
                                                            name="number"
                                                            placeholder="Card Number"
                                                            onKeyUp={this.onCardInputChange}
                                                            onFocus={this.handleInputFocus}
                                                            required
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
                                                            required
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
                                                            required
                                                        />
                                                        <input
                                                            className="card-cvc"
                                                            type="tel"
                                                            name="cvc"
                                                            placeholder="CVC"
                                                            onKeyUp={this.onCardInputChange}
                                                            onFocus={this.handleInputFocus}
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <Button className="pay-btn" type="submit">Pay</Button>
                                                    </div>

                                                    <div className="pay-error-message">
                                                        <h4>
                                                            <strong>
                                                                {this.props.ticketReducer.errorPayMessage}
                                                            </strong>
                                                        </h4>
                                                    </div>

                                                    <div>
                                                        <h4>
                                                            <strong>
                                                                {this.props.ticketReducer.successPayMessage}
                                                            </strong>
                                                        </h4>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
