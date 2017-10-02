import React, { Component } from 'react';
import {Route, Switch} from 'react-router';
import TrainContainer from './container/TrainContainer';
import StationContainer from './container/StationContainer';
import PassengerContainer from './container/PassengerContainer';
import RegistrationContainer from './container/RegistrationContainer';
import LoginContainer from './container/LoginContainer';
import LogoutContainer from './container/LogoutContainer';
import cookie from 'react-cookies';

export default class EmpMain extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/rws/employee/train' component={cookie.load('RWS_COOKIE') !== undefined ? TrainContainer : LoginContainer} />
                    <Route path='/rws/employee/station' component={StationContainer} />
                    <Route path='/rws/employee/passenger' component={PassengerContainer} />
                    <Route path='/rws/employee/registration' component={cookie.load('RWS_COOKIE') !== undefined ? TrainContainer : RegistrationContainer} />
                    <Route path='/rws/employee/login' component={cookie.load('RWS_COOKIE') !== undefined ? TrainContainer : LoginContainer} />
                    <Route path='/rws/employee/logout' component={LogoutContainer} />
                    <Route component={TrainContainer} />
                </Switch>
            </main>
        );
    }
}