import React, {Component} from 'react';
import '../css/Login.css';
import *as employeeActions from './actions/employeeActions';
import {Button, Col, FormControl, FormGroup, Glyphicon, Grid, InputGroup, Jumbotron, Row} from "react-bootstrap";

export default class Login extends Component {

    constructor(){
        super();
        this.state = {
            login: '',
            password: ''
        }
    }

    componentWillMont(){
        employeeActions.setErrorLoginMessage('');
        this.setState({
            login: '',
            password: ''
        })
    }

    loginEmployee(event) {
        event.preventDefault();
        this.props.employeeActions.loginEmployee({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            login: this.state.login,
            password: this.state.password
        });
        this.setState({
            login: '',
            password: ''
        })
    }

    onLoginChange(event){
        employeeActions.setErrorLoginMessage('');
        this.setState({
            login: event.target.value
        })
    }

    onPasswordChange(event){
        employeeActions.setErrorLoginMessage('');
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <Grid>
                <Row className="login-top-row">
                    <Col xs={6} md={12}>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} md={3}>
                    </Col>

                    <Col xs={6} md={6}>
                        <Jumbotron className="login-jum">
                            <form onSubmit={this.loginEmployee.bind(this)}>
                                <FormGroup bsSize="large">
                                    <InputGroup>
                                        <InputGroup.Addon className="login-input">
                                            <Glyphicon glyph="user"/>
                                        </InputGroup.Addon>
                                        <FormControl type="text" placeholder="Login" onChange={this.onLoginChange.bind(this)}/>
                                    </InputGroup>
                                </FormGroup>


                                <FormGroup bsSize="large">
                                    <InputGroup>
                                        <InputGroup.Addon className="login-input">
                                            <Glyphicon glyph="lock"/>
                                        </InputGroup.Addon>
                                        <FormControl type="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)}/>
                                    </InputGroup>
                                </FormGroup>

                                <h4 className="error-login-message">{this.props.employeeReducer.errorLoginMessage}</h4>

                                <Button className="login-btn" type="submit">Login</Button>
                            </form>

                        </Jumbotron>
                    </Col>

                    <Col xsHidden md={3}>
                    </Col>
                </Row>
            </Grid>

        );
    }
}