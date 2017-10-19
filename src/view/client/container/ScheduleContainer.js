import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as scheduleActions from '../actions/scheduleActions';
import Schedule from "../Schedule";

class ScheduleContainer extends Component {

    componentWillMount() {
        scheduleActions.getListStations();
    }

    render() {
        return (
            <Schedule scheduleReducer={this.props.scheduleReducer}
                      scheduleActions={this.props.scheduleActions}
            />
        );
    }
}

function mapStateToProps (store) {
    return {
        scheduleReducer: store.scheduleReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        scheduleActions: bindActionCreators(scheduleActions, dispatch),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ScheduleContainer)
)