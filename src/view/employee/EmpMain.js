import React, { Component } from 'react';
import {Route, Switch} from 'react-router';
import TrainContainer from './container/TrainContainer';
import StationContainer from './container/StationContainer';
import PassengerContainer from './container/PassengerContainer';
import RegistrationContainer from './container/RegistrationContainer';
import LoginContainer from './container/LoginContainer';
import LogoutContainer from './container/LogoutContainer';
import TimetableContainer from './container/TimetableContainer';
import cookie from 'react-cookies';

export default class EmpMain extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/rws/employee/train'
                           component={cookie.load('RWS_COOKIE') !== undefined ? TrainContainer : LoginContainer} />
                    <Route path='/rws/employee/station'
                           component={cookie.load('RWS_COOKIE') !== undefined ? StationContainer : LoginContainer} />
                    <Route path='/rws/employee/passenger'
                           component={cookie.load('RWS_COOKIE') !== undefined ? PassengerContainer : LoginContainer} />
                    <Route path='/rws/employee/timetable'
                           component={cookie.load('RWS_COOKIE') !== undefined ? TimetableContainer : LoginContainer} />
                    <Route path='/rws/employee/registration'
                           component={cookie.load('RWS_COOKIE') !== undefined ? TrainContainer : RegistrationContainer} />
                    <Route path='/rws/employee/login'
                           component={cookie.load('RWS_COOKIE') !== undefined ? TrainContainer : LoginContainer} />
                    <Route path='/rws/employee/logout'
                           component={LogoutContainer} />
                    <Route component={TrainContainer} />
                </Switch>
            </main>
        );
    }
}