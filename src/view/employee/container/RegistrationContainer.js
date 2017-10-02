import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../actions/employeeActions';
import Registration from "../Registration";

class RegistrationContainer extends Component {
    render() {
        return (
            <Registration employeeReducer={this.props.employeeReducer}
                   employeeActions={this.props.employeeActions}
            />
        );
    }
}

function mapStateToProps (store) {
    return {
        employeeReducer: store.employeeReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        employeeActions: bindActionCreators(employeeActions, dispatch),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegistrationContainer)
)