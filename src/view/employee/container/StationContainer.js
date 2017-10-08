import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as stationActions from '../actions/stationActions';
import Station from "../Station";

class StationContainer extends Component {

    componentWillMount() {
        stationActions.getListStations();
    }

    render() {
        return (
            <Station stationReducer={this.props.stationReducer}
                     stationActions={this.props.stationActions}
            />
        );
    }
}

function mapStateToProps (store) {
    return {
        stationReducer: store.stationReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        stationActions: bindActionCreators(stationActions, dispatch),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(StationContainer)
)