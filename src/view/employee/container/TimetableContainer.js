import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as timetableActions from '../actions/timetableActions';
import Timetable from "../Timetable";

class TimetableContainer extends Component {

    componentWillMount(){
        timetableActions.getListStations();
        timetableActions.getListTrains();
    }

    render() {
        return (
            <Timetable  timetableReducer={this.props.timetableReducer}
                        timetableActions={this.props.timetableActions}/>
        );
    }
}

function mapStateToProps(store) {
    return {
        timetableReducer: store.timetableReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        timetableActions: bindActionCreators(timetableActions, dispatch),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TimetableContainer)
)