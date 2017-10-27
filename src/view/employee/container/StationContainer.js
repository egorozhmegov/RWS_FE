import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as stationActions from '../actions/stationActions';
import {Col, Grid, Jumbotron, Row} from "react-bootstrap";
import '../../css/Station.css'
import Station from "../Station";
import StationMarkerMap from "../StationMarkerMap";

class StationContainer extends Component {

    constructor(){
        super();
        this.state = {
            center: { lat: 59.9342802, lng: 30.335098600000038 }
        }
    }

    componentWillMount() {
        stationActions.getListStations();
    }

    onCenterChange(center){
        this.setState({center: center})
    }

    render() {
        return (
        <Grid>
            <Row>
                <Col xs={6} md={12}>
                    <Jumbotron className="station-jum">
                        <Grid>
                            <Row>
                                <Col xs={6} md={6}>
                                    <div>
                                        <Station
                                            stationReducer={this.props.stationReducer}
                                            stationActions={this.props.stationActions}
                                            center={this.state.center}
                                            onCenterChange={this.onCenterChange.bind(this)}
                                        />
                                    </div>
                                </Col>

                                <Col xs={6} md={6}>
                                    <StationMarkerMap
                                        stationReducer={this.props.stationReducer}
                                        stationActions={this.props.stationActions}
                                        center={this.state.center}
                                        onCenterChange={this.onCenterChange.bind(this)}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </Jumbotron>
                </Col>
            </Row>
        </Grid>
        )
    }
}

function mapStateToProps (store) {
    return {
        stationReducer: store.stationReducer,
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