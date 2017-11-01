import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as ticketActions from '../actions/ticketActions';
import {Route, Switch} from 'react-router';
import Ticket from "../Ticket";
import TicketTrain from "../TicketTrain";
import TicketTrainInfo from "../TicketTrainInfo";
import {Col, Grid, Jumbotron, Row} from "react-bootstrap";
import RouteMap from "../RouteMap";
import '../../css/TicketContainer.css'

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
                               component={() => this.props.ticketReducer.trains.length !== 0 ?
                                   <TicketTrain ticketReducer={this.props.ticketReducer}
                                                ticketActions={this.props.ticketActions}/>
                                   :
                                   <Ticket ticketReducer={this.props.ticketReducer}
                                           ticketActions={this.props.ticketActions}/>
                               }/>

                        <Route exact path='/rws/client/tickets/trains/info'
                               component={() => this.props.ticketReducer.trainInfo.stationFrom.title !== '' ?
                                   <Grid>
                                       <Row>
                                           <Col xs={6} md={12}>
                                               <Jumbotron className="station-jum">
                                                   <Grid>
                                                       <Row>
                                                           <Col xs={6} md={6}>
                                                               <div>
                                                                   <TicketTrainInfo
                                                                       ticketReducer={this.props.ticketReducer}
                                                                       ticketActions={this.props.ticketActions}/>
                                                               </div>
                                                           </Col>

                                                           <Col xs={6} md={6}>
                                                               <RouteMap ticketReducer={this.props.ticketReducer}
                                                                         ticketActions={this.props.ticketActions}/>
                                                           </Col>
                                                       </Row>
                                                   </Grid>
                                               </Jumbotron>
                                           </Col>
                                       </Row>
                                   </Grid>
                                   :
                                   <Ticket ticketReducer={this.props.ticketReducer}
                                           ticketActions={this.props.ticketActions}/>
                               }
                        />

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