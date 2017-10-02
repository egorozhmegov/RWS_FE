import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as trainActions from '../actions/trainActions';
import Train from "../Train";

class TrainContainer extends Component {

    componentWillMount() {
        trainActions.getListTrains();
    }

    render() {
        return (
            <Train trainReducer={this.props.trainReducer}
                  trainActions={this.props.trainActions}
            />
        );
    }
}

function mapStateToProps (store) {
    return {
        trainReducer: store.trainReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        trainActions: bindActionCreators(trainActions, dispatch),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TrainContainer)
)