import React, {Component} from 'react';
import '../css/TicketTrainInfo.css';
import {Button, Col, Glyphicon, Grid, Jumbotron, Row} from "react-bootstrap";

export default class TicketTrainInfo extends Component {

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={12}>
                        <Jumbotron className="ticket-train-jum">

                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        )
    }
}