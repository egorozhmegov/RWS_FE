import React, { Component } from 'react';
import '../css/Login.css';
import store from './store/configStore';
import *as employeeActions from './actions/employeeActions';

export default class Login extends Component {

    clearMessage(){
        employeeActions.setErrorLoginMessage('');
    }

    loginEmployee(event){
        event.preventDefault();
        this.props.employeeActions.loginEmployee({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            login: this.loginInput.value,
            password: this.passwordInput.value
        });
        this.loginInput.value = '';
        this.passwordInput.value = '';
    }

    render() {
        return (
            <div className="loginForm">
                <form onSubmit={this.loginEmployee.bind(this)}>
                    <input type="text" placeholder="Login" className="loginInput" ref={(input) => {this.loginInput = input}} onChange={this.clearMessage.bind(this)}/>
                    <input type="password" placeholder="Password" className="loginInput" ref={(input) => {this.passwordInput = input}}/>
                    <button type="submit" className="loginBtn">Login</button>
                </form>
                <h4 className="errorMessage">{store.getState().employeeReducer.errorLoginMessage}</h4>
            </div>
        );
    }
}