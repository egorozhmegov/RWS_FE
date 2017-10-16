import React, {Component} from 'react';
import trainLogo from '../img/train.svg';
import { Link } from 'react-router-dom';
import '../css/CliHeader.css';
import { auth } from './constants/firebase';
import store from './store/configStore';
import {push} from 'connected-react-router';
import logOut from '../img/logout.svg';

export default class CliHeader extends Component {

    logout() {
        auth.signOut()
            .then(() => {
                store.dispatch(push('/rws/client'));
                window.location.reload();
            });
    }

    render() {
        return (
            <header>
                <nav>
                    <div>
                        <ul className="cli-header">
                            <li className="cli-header-label">RWS</li>
                            <li className="cli-header-li"><img className="train-logo" src={trainLogo} alt="train_logo" /></li>
                            <li className="cli-header-li"><Link className="cli-header-link" to='/rws/client/tickets'>TRAIN TICKETS</Link></li>
                            <li className="cli-header-li"><Link className="cli-header-link" to='/rws/client/schedule'>SCHEDULE</Link></li>
                            <li><button className="sign-out-btn" onClick={this.logout.bind(this)}>SIGN OUT</button></li>
                            <li className="right-link">{<img className="loginLogo" src={logOut} alt="logout_logo" />}</li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}