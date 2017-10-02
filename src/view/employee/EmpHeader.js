import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/EmpHeader.css';
import trainLogo from '../img/train.svg';
import loginLogo from '../img/login.svg';
import logOut from '../img/logout.svg';
import registerLogo from '../img/register.svg';
import cookie from 'react-cookies';

export default class EmpHeader extends Component {

    render() {
        return (
            <header>
                <nav>
                    <div>
                        <ul className="empHeaderUl">
                            <li className="empHeaderLabel">RWS</li>
                            <li className="empHeaderLi"><img className="trainLogo" src={trainLogo} alt="train_logo" /></li>
                            <li className="empHeaderLi"><Link to='/rws/employee/train' className="empHeaderLink">Trains</Link></li>
                            <li className="empHeaderLi"><Link to='/rws/employee/station' className="empHeaderLink">Railway stations</Link></li>
                            <li className="empHeaderLi"><Link to='/rws/employee/passenger' className="empHeaderLink">Passengers</Link></li>
                            <li className="rightLink">{ cookie.load('RWS_COOKIE') !== undefined ? <Link to='/rws/employee/logout' className="empHeaderLink">Sign out</Link> : null}</li>
                            <li className="rightLink">{ cookie.load('RWS_COOKIE') !== undefined ? <img className="loginLogo" src={logOut} alt="logout_logo" /> : null}</li>
                            <li className="rightLink">{ cookie.load('RWS_COOKIE') !== undefined ? null : <Link to='/rws/employee/login' className="empHeaderLink">Sign in</Link>}</li>
                            <li className="rightLink">{ cookie.load('RWS_COOKIE') !== undefined ? null : <img className="loginLogo" src={loginLogo} alt="login_logo" />}</li>
                            <li className="rightLink">{ cookie.load('RWS_COOKIE') !== undefined ? null : <Link to='/rws/employee/registration' className="empHeaderLink">Registration</Link>}</li>
                            <li className="rightLink">{ cookie.load('RWS_COOKIE') !== undefined ? null : <img className="registerLogo" src={registerLogo} alt="register_logo" />}</li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}