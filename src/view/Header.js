import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/Header.css';
import client from './img/client.png';
import admin from './img/admin.png';
import {Col, Grid, Row} from "react-bootstrap";

export default class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <div>
                        <Grid>
                            <Row className="client-header">
                                <Col xs={6} md={6}>
                                    <Link className="client-link" to='/rws/client'>{<img src={client}
                                                                                           alt="client_logo"/>}</Link>
                                </Col>

                                <Col xs={6} md={6}>
                                    <Link to='/rws/employee'>{<img src={admin} alt="client_logo"/>}</Link>
                                </Col>
                            </Row>
                        </Grid>


                    </div>
                </nav>
            </header>
        );
    }
}