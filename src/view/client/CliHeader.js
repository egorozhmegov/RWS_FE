import React, {Component} from 'react';
import trainLogo from '../img/train-gr.svg';
import '../css/CliHeader.css';
import {auth} from './constants/firebase';
import store from './store/configStore';
import {push} from 'connected-react-router';
import {Glyphicon, Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default class CliHeader extends Component {

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to="/rws/client">
                            <a className="brand">RWS</a>
                        </LinkContainer>
                    </Navbar.Brand>
                    <span><img className="trainLogo" src={trainLogo} alt="train_logo"/></span>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav>
                        <NavItem>
                        </NavItem>

                        <LinkContainer to="/rws/client/tickets">
                            <NavItem className="nav-item">
                                <span>Tickets</span>
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to="/rws/client/schedule">
                            <NavItem className="nav-item">
                                <span>Schedule</span>
                            </NavItem>
                        </LinkContainer>

                    </Nav>

                    <Nav pullRight>
                        <LinkContainer to="#" onClick={() => auth.signOut()
                            .then(() => {
                                store.dispatch(push('/rws/client'));
                                window.location.reload();
                            })}>
                            <NavItem className="nav-item">
                                <Glyphicon glyph="log-out"/>
                                <span> Logout</span>
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}