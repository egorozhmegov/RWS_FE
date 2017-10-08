import React, { Component } from 'react';
import {Route, Switch} from 'react-router';
import EmployeeApp from './employee/EmployeeApp';
import ClientAuth from "./client/ClientAuth";
import Header from "./Header";

export default class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Header} />
                    <Route path='/rws/client' component={ClientAuth} />
                    <Route path='/rws/employee' component={EmployeeApp} />
                    <Route component={Header} />
                </Switch>
            </main>
        );
    }
}