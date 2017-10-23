import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as ticketActions from '../actions/ticketActions';
import Ticket from "../Ticket";

class TicketsContainer extends Component {

    componentWillMount() {
        ticketActions.getListStations();
    }

    render() {
        return (
            <Ticket ticketReducer={this.props.ticketReducer}
                   ticketActions={this.props.ticketActions}
            />
        );
    }
}

function mapStateToProps (store) {
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