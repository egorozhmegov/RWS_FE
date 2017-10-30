import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as ticketActions from '../actions/ticketActions';
import {Route, Switch} from 'react-router';
import Ticket from "../Ticket";
import TicketTrain from "../TicketTrain";

class TicketsContainer extends Component {

    render() {
        return (
            <div>
                <main>
                    <Switch>
                        <Route exact path='/rws/client/tickets'
                               component={() => <Ticket ticketReducer={this.props.ticketReducer}
                                                        ticketActions={this.props.ticketActions}/>}/>

                        <Route exact path='/rws/client/tickets/trains'
                               component={() => <TicketTrain ticketReducer={this.props.ticketReducer}
                                                             ticketActions={this.props.ticketActions}/>}/>

                        <Route component={() => <Ticket ticketReducer={this.props.ticketReducer}
                                                        ticketActions={this.props.ticketActions}/>}/>
                    </Switch>
                </main>
            </div>

        );
    }
}

function mapStateToProps(store) {
    return {
        ticketReducer: store.ticketReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ticketActions: bindActionCreators(ticketActions, dispatch),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TicketsContainer)
)