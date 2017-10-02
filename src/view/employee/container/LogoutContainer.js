import React, { Component } from 'react';
import * as employeeActions from '../actions/employeeActions';

export default class LogoutContainer extends Component {

    componentWillMount() {
        employeeActions.logoutEmployee();
    }

    render() {
        return (
            <div>
                <h3>

                </h3>
            </div>
        );
    }
}

