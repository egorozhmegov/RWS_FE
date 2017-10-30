import React, {Component} from 'react';
import '../css/TicketTrain.css';
import {Col, Grid, Jumbotron, Row} from "react-bootstrap";

export default class TicketTrain extends Component {

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
        );
    }
}