import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/EmpHeader.css';
import trainLogo from '../img/train-gr.svg';
import cookie from 'react-cookies';
import {Glyphicon, Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


export default class EmpHeader extends Component {

    render() {
        return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <LinkContainer to="/rws/employee">
                        <a className="brand">RWS</a>
                    </LinkContainer>
                </Navbar.Brand>
                <span><img className="trainLogo" src={trainLogo} alt="train_logo" /></span>
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <Nav>
                    <NavItem>
                    </NavItem>

                    { cookie.load('RWS_COOKIE') !== undefined ?
                    <LinkContainer to="/rws/employee/train">
                        <NavItem className="nav-item">
                            <span>Trains</span>
                        </NavItem>
                    </LinkContainer> : null}

                    { cookie.load('RWS_COOKIE') !== undefined ?
                        <LinkContainer to="/rws/employee/station">
                            <NavItem className="nav-item">
                                <span>  Stations</span>
                            </NavItem>
                        </LinkContainer> : null}

                    { cookie.load('RWS_COOKIE') !== undefined ?
                        <LinkContainer to="/rws/employee/passenger">
                            <NavItem className="nav-item">
                                <span>  Passengers</span>
                            </NavItem>
                        </LinkContainer> : null}
                </Nav>

                <Nav pullRight>
                    {cookie.load('RWS_COOKIE') !== undefined ?
                        <LinkContainer to="/rws/employee/logout">
                            <NavItem className="nav-item">
                                <Glyphicon glyph="log-out" />
                                <span>  Logout</span>
                            </NavItem>
                        </LinkContainer> : null}


                    {cookie.load('RWS_COOKIE') === undefined ?
                        <LinkContainer to="/rws/employee/login">
                            <NavItem className="nav-item">
                                <Glyphicon glyph="log-in" />
                                <span>  Login</span>
                            </NavItem>
                        </LinkContainer> : null}

                    {cookie.load('RWS_COOKIE') === undefined ?
                        <LinkContainer to="/rws/employee/registration">
                            <NavItem className="nav-item">
                                <Glyphicon glyph="user" />
                                <span> Registration</span>
                            </NavItem>
                        </LinkContainer> : null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        );
    }
}