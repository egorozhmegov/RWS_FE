import React, {Component} from 'react';
import '../css/Registration.css';
import 'material-components-web/dist/material-components-web.min.css';
import *as employeeActions from './actions/employeeActions';
import {Textfield} from 'react-mdc-web/lib';
import {Button, Col, FormGroup, Grid, InputGroup, Jumbotron, Row} from "react-bootstrap";
import note from '../img/note.svg';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            confirmPassword: '',

            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            loginValid: false,
            passwordValid: false,
            confirmPasswordValid: false,


            snackbar: true
        };
    }

    componentWillMount() {
        employeeActions.setErrorRegisterMessage('');
        this.setState({firstName: ''});
        this.setState({lastName: ''});
        this.setState({email: ''});
        this.setState({login: ''});
        this.setState({password: ''});
        this.setState({confirmPassword: ''});
    }

    registerEmployee(event) {
        event.preventDefault();
        this.props.employeeActions.registerEmployee({
            userFirstName: this.state.firstName,
            userLastName: this.state.lastName,
            email: this.state.email,
            login: this.state.login,
            password: this.state.password
        });
    }

    onFirstNameChange(event) {
        employeeActions.setErrorRegisterMessage('');
        this.setState({
            firstName: event.target.value,
            firstNameValid: !event.target.value.trim().length > 0
        })
    }

    onLastNameChange(event) {
        employeeActions.setErrorRegisterMessage('');
        this.setState({
            lastName: event.target.value,
            lastNameValid: !event.target.value.trim().length > 0
        })
    }

    onEmailChange(event) {
        employeeActions.setErrorRegisterMessage('');
        this.setState({
            email: event.target.value,
            emailValid: !event.target.value.trim().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        })
    }

    onLoginChange(event) {
        employeeActions.setErrorRegisterMessage('');
        this.setState({
            login: event.target.value,
            loginValid: !event.target.value.trim().length > 0
        })
    }

    onPasswordChange(event) {
        employeeActions.setErrorRegisterMessage('');
        this.setState({
            password: event.target.value,
        })
    }

    onConfirmPasswordChange(event) {
        employeeActions.setErrorRegisterMessage('');
        this.setState({
            confirmPassword: event.target.value,
            confirmPasswordValid: event.target.value !== this.state.password
        })
    }


    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="register-jum">
                            <form onSubmit={this.registerEmployee.bind(this)}>
                                <Grid>
                                    <Row>
                                        <Col xs={6} md={12}>
                                            <p>
                                                <img src={note} alt="note_logo"/>
                                                <strong className="register-label">Registration</strong>
                                            </p>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} md={4}>
                                            <FormGroup bsSize="large">
                                                <InputGroup>
                                                    <Textfield className="register-input"
                                                               floatingLabel="First Name"
                                                               type="text"
                                                               useInvalidProp
                                                               invalid={this.state.firstNameValid}
                                                               value={this.state.firstName}
                                                               required
                                                               helptext="Must not be empty"
                                                               helptextValidation
                                                               onChange={this.onFirstNameChange.bind(this)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>

                                        <Col xs={6} md={4}>
                                            <FormGroup bsSize="large">
                                                <InputGroup>
                                                    <Textfield className="register-input"
                                                               floatingLabel="Last Name"
                                                               type="text"
                                                               useInvalidProp
                                                               invalid={this.state.lastNameValid}
                                                               value={this.state.lastName}
                                                               required
                                                               helptext="Must not be empty"
                                                               helptextValidation
                                                               onChange={this.onLastNameChange.bind(this)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>

                                        <Col xs={6} md={4}>
                                            <FormGroup bsSize="large">
                                                <InputGroup>
                                                    <Textfield className="register-input"
                                                               floatingLabel="Email"
                                                               type="email"
                                                               useInvalidProp
                                                               invalid={this.state.emailValid}
                                                               required
                                                               value={this.state.email}
                                                               helptext="Email is invalid"
                                                               helptextValidation
                                                               onChange={this.onEmailChange.bind(this)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} md={4}>
                                            <FormGroup bsSize="large">
                                                <InputGroup>
                                                    <Textfield className="register-input"
                                                               floatingLabel="Login"
                                                               type="text"
                                                               useInvalidProp
                                                               invalid={this.state.loginValid}
                                                               value={this.state.login}
                                                               required
                                                               helptext="Must not be empty"
                                                               helptextValidation
                                                               onChange={this.onLoginChange.bind(this)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>

                                        <Col xs={6} md={4}>
                                            <FormGroup bsSize="large">
                                                <InputGroup>
                                                    <Textfield className="register-input"
                                                               floatingLabel="Password"
                                                               type="password"
                                                               value={this.state.password}
                                                               required minLength={6}
                                                               helptext="Must be at least 6 characters"
                                                               helptextValidation
                                                               onChange={this.onPasswordChange.bind(this)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>

                                        <Col xs={6} md={4}>
                                            <FormGroup bsSize="large">
                                                <InputGroup>
                                                    <Textfield className="register-input"
                                                               floatingLabel="Confirm password"
                                                               type="password"
                                                               useInvalidProp
                                                               invalid={this.state.confirmPasswordValid}
                                                               value={this.state.confirmPassword}
                                                               required
                                                               helptext="Confirm password doesn't match"
                                                               helptextValidation
                                                               onChange={this.onConfirmPasswordChange.bind(this)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} md={4}>
                                            <Button className="register-btn" type="submit">Register</Button>
                                        </Col>

                                        <Col xs={6} md={4}>
                                            <h3 className="error-register-message">{this.props.employeeReducer.errorRegisterMessage}</h3>
                                        </Col>

                                        <Col xs={6} md={4}>
                                        </Col>
                                    </Row>
                                </Grid>
                            </form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
