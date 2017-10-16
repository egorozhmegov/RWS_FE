import React, {Component} from 'react';
import TicketsContainer from "./container/TicketsContainer";
import ScheduleContainer from "./container/ScheduleContainer";
import {Route, Switch} from 'react-router';

export default class CliMain extends Component {
    render() {
        return (
        <div>
            <main>
                <Switch>
                    <Route exact path='/rws/client/tickets' component={TicketsContainer} />
                    <Route path='/rws/client/schedule' component={ScheduleContainer} />
                    <Route component={TicketsContainer} />
                </Switch>
            </main>
        </div>
        );
    }
}