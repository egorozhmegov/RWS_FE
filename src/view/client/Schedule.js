import React, {Component} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import '../css/Schedule.css';

export default class Schedule extends Component {
    render() {
        return (
            <div>
                <Container className="schedule">
                    <Row>
                        <Col sm={5}>
                        </Col>

                        <Col sm={4}>
                            <h2>Schedule</h2>
                        </Col>

                        <Col sm={3}>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>

                        </Col>

                        <Col sm={4}>

                        </Col>

                        <Col sm={4}>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}