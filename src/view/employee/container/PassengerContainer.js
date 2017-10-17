import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as passengerActions from '../actions/passengerActions';
import Passenger from "../Passenger";

class PassengerContainer extends Component {

    constructor(){
        super();
        passengerActions.getListPassengers();
    }

    componentWillMount() {

    }

    render() {
        return (
            <Passenger passengerReducer={this.props.passengerReducer}
                     passengerActions={this.props.passengerActions}
                       passengers = {[1,2,3]}
            />
        );
    }
}

function mapStateToProps (store) {
    return {
        passengerReducer: store.passengerReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        passengerActions: bindActionCreators(passengerActions, dispatch),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PassengerContainer)
)