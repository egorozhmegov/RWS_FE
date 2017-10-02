import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

export default class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <div>
                        <ul className="headerNav">
                            <li className="headerLi"><Link to='/rws/client' className="headerLink">Client</Link></li>
                            <li><Link to='/rws/employee' className="headerLink">Employee</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}