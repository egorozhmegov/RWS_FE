import React, {Component} from 'react';
import { auth, provider } from './constants/firebase';
import GoogleButton from 'react-google-button';
import ClientApp from "./ClientApp";
import {Container, Row, Col} from 'react-grid-system';
import '../css/ClientAuth.css';
import store from './store/configStore';
import {push} from 'connected-react-router';

export default class ClientAuth extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: false
        };
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                });
            }
        });
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            })
            .then(() => {store.dispatch(push('/rws/client/tickets'))})
    }

    render() {
        return (
            <div>
                <header>
                    <div>
                        {this.state.user ?
                            <ClientApp user = {this.state.user}/>
                            :
                            <Container>
                                <Row>
                                    <Col sm={4}>
                                    </Col>

                                    <Col sm={4}>
                                        <GoogleButton className="google-btn" onClick={this.login}/>
                                    </Col>

                                    <Col sm={4}>
                                    </Col>
                                </Row>
                            </Container>
                        }
                    </div>
                </header>
            </div>
        );
    }
}