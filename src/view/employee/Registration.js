import React, {Component} from 'react';
import '../css/Registration.css';
import '../css/Login.css';
import 'material-components-web/dist/material-components-web.min.css';
import store from './store/configStore';
import {RegistrationFormError} from './RegistrationFormError';
import *as employeeActions from './actions/employeeActions';
import {Textfield} from 'react-mdc-web/lib';
import {
    Button, Col, ControlLabel, FormControl, FormGroup, Glyphicon, Grid, InputGroup, Jumbotron,
    Row
} from "react-bootstrap";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            Email: '',
            Login: '',
            Password: '',
            ConfirmPassword: '',
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            loginValid: false,
            passwordValid: false,
            confirmPasswordValid: false,

            formErrors: {
                FirstName: '',
                LastName: '',
                Email: '',
                Login: '',
                Password: '',
                ConfirmPassword: ''
            }
        };
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="register-jum">
                            <form>
                                <Grid>
                                    <Row>
                                        <Col xs={6} md={12}>
                                            <h3 className="register-label"><strong>Registration</strong></h3>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} md={4}>
                                            <FormGroup bsSize="large">
                                                <InputGroup>
                                                    <Textfield className="register-input"
                                                               floatingLabel="First Name"
                                                               type="text"
                                                               value={this.state.FirstName}
                                                               required
                                                               helptext="Must not be empty"
                                                               helptextValidation
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
                                                               value={this.state.LastName}
                                                               required
                                                               helptext="Must not be empty"
                                                               helptextValidation
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
                                                               value={this.state.Email}
                                                               required
                                                               helptext="Email is invalid"
                                                               helptextValidation
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
                                                               value={this.state.Login}
                                                               required
                                                               helptext="Must not be empty"
                                                               helptextValidation
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
                                                               value={this.state.Password}
                                                               required minLength={6}
                                                               helptext="Must be at least 8 characters"
                                                               helptextValidation
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
                                                               value={this.state.ConfirmPassword}
                                                               required
                                                               minLength={6}
                                                               helptext="Confirm password doesn't match"
                                                               helptextValidation
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} md={12}>
                                            <Button className="login-btn" type="submit">Register</Button>
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



// import React, { Component } from 'react';
// import '../css/Registration.css';
// import '../css/Login.css';
// import store from './store/configStore';
// import {RegistrationFormError} from './RegistrationFormError';
// import *as employeeActions from './actions/employeeActions';
// import {Container, Row, Col} from 'react-grid-system';
//
// export default class Registration extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             FirstName: '',
//             LastName: '',
//             Email: '',
//             Login: '',
//             Password: '',
//             ConfirmPassword: '',
//             firstNameValid : false,
//             lastNameValid : false,
//             emailValid : false,
//             loginValid : false,
//             passwordValid : false,
//             confirmPasswordValid : false,
//
//             formErrors: {
//                 FirstName: '',
//                 LastName: '',
//                 Email: '',
//                 Login: '',
//                 Password: '',
//                 ConfirmPassword: ''
//             }
//         };
//     }
//
//     componentWillMount(){
//         this.setState({FirstName: ''});
//         this.setState({LastName: ''});
//         this.setState({Email: ''});
//         this.setState({Login: ''});
//         this.setState({Password: ''});
//         this.setState({ConfirmPassword: ''});
//     }
//
//     handleUserInput (e) {
//         employeeActions.setErrorRegisterMessage('');
//         employeeActions.setSuccessMessage('');
//
//         const name = e.target.name;
//         const value = e.target.value;
//
//         this.setState({[name]: value},
//             () => { this.validateField(name, value) });
//     }
//
//     validateField(fieldName, value) {
//         let fieldValidationErrors = this.state.formErrors;
//         let firstNameValid = this.state.firstNameValid;
//         let lastNameValid = this.state.lastNameValid;
//         let emailValid = this.state.emailValid;
//         let loginValid = this.state.loginValid;
//         let passwordValid = this.state.passwordValid;
//         let confirmPasswordValid = this.state.confirmPasswordValid;
//
//         switch(fieldName) {
//             case 'FirstName':
//                 firstNameValid = value.trim().length >= 2;
//                 fieldValidationErrors.FirstName = firstNameValid ? '' : ' is invalid (less 2 letters)';
//                 break;
//             case 'LastName':
//                 lastNameValid = value.trim().length >= 2;
//                 fieldValidationErrors.LastName = lastNameValid ? '' : ' is invalid (less 2 letters)';
//                 break;
//             case 'Email':
//                 emailValid = value.trim().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
//                 fieldValidationErrors.Email = emailValid ? '' : ' is invalid';
//                 break;
//             case 'Login':
//                 loginValid = value.trim().length >= 2;
//                 fieldValidationErrors.Login = loginValid ? '' : ' is invalid (less 2 letters)';
//                 break;
//             case 'Password':
//                 passwordValid = value.trim().length >= 4;
//                 fieldValidationErrors.Password = passwordValid ? '': ' is too short';
//                 break;
//             case 'ConfirmPassword':
//                 confirmPasswordValid = value.trim() === this.state.Password;
//                 fieldValidationErrors.ConfirmPassword = confirmPasswordValid ? '': ' does not match';
//                 break;
//             default:
//                 break;
//         }
//         this.setState({formErrors: fieldValidationErrors,
//             firstNameValid : firstNameValid,
//             lastNameValid : lastNameValid,
//             emailValid : emailValid,
//             loginValid : loginValid,
//             passwordValid : passwordValid,
//             confirmPasswordValid : confirmPasswordValid
//         }, this.validateForm);
//     }
//
//     validateForm() {
//         this.setState({formValid:
//         this.state.firstNameValid
//         && this.state.lastNameValid
//         && this.state.emailValid
//         && this.state.loginValid
//         && this.state.passwordValid
//         && this.state.confirmPasswordValid});
//     }
//
//     registerEmployee(event){
//         event.preventDefault();
//         this.props.employeeActions.registerEmployee({
//             firstName: this.state.FirstName,
//             lastName: this.state.LastName,
//             email: this.state.Email,
//             login: this.state.Login,
//             password: this.state.Password
//         });
//     }
//
//     render() {
//         return (
//             <Container>
//                 <Row>
//                     <Col sm={4}>
//                     </Col>
//
//                     <Col sm={4}>
//                         <div className="registerForm">
//                             <form onSubmit={this.registerEmployee.bind(this)}>
//                                 <h2>Registration</h2>
//
//                                 <label>First Name</label>
//                                 <input type="text" required placeholder="First Name"
//                                        className="registerInput"
//                                        name="FirstName"
//                                        value={this.state.FirstName}
//                                        onChange={this.handleUserInput.bind(this)}/>
//
//                                 <label>Last Name</label>
//                                 <input type="text" required placeholder="Last Name"
//                                        className="registerInput"
//                                        name="LastName"
//                                        value={this.state.LastName}
//                                        onChange={this.handleUserInput.bind(this)}/>
//
//                                 <label>Email</label>
//                                 <input type="email" required placeholder="Email"
//                                        className="registerInput"
//                                        name="Email"
//                                        value={this.state.Email}
//                                        onChange={this.handleUserInput.bind(this)}/>
//
//                                 <label>Login</label>
//                                 <input type="text" required placeholder="Login"
//                                        className="registerInput"
//                                        name="Login"
//                                        value={this.state.Login}
//                                        onChange={this.handleUserInput.bind(this)}/>
//
//                                 <label>Password</label>
//                                 <input type="password" required placeholder="Password"
//                                        className="registerInput"
//                                        name="Password"
//                                        value={this.state.Password}
//                                        onChange={this.handleUserInput.bind(this)}/>
//
//                                 <label>Confirm Password</label>
//                                 <input type="password" required placeholder="Confirm Password"
//                                        className="registerInput"
//                                        name="ConfirmPassword"
//                                        value={this.state.ConfirmPassword}
//                                        onChange={this.handleUserInput.bind(this)}/>
//
//                                 <button type="submit" className="registerBtn" disabled={!this.state.formValid}>Register</button>
//                             </form>
//
//                             <h4><RegistrationFormError formErrors={this.state.formErrors} /></h4>
//                             <h4 className="errorMessage">{store.getState().employeeReducer.errorRegisterMessage}</h4>
//                             <h4 className="successMessage">{store.getState().employeeReducer.successMessage}</h4>
//                         </div>
//                     </Col>
//
//                     <Col sm={4}>
//                     </Col>
//                 </Row>
//             </Container>
//         );
//     }
// }