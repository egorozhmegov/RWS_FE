import React, {Component} from 'react';
import '../css/CliFooter.css';
import { Link } from 'react-router-dom';
import gmail from '../img/gmail.svg';
import phone from '../img/telephone.svg';

export default class CliFooter extends Component {
    render() {
        return (
            <div>
                <ul className="footer">
                    <li><img className="user-profile" src={this.props.user.photoURL} alt="google-foto"/></li>
                    <li className="cli-footer-li">{this.props.user.displayName}</li>
                    <li className="cli-footer-li-right"><Link to='#'>rws.inf@gmail.com</Link></li>
                    <li className="gmail-logo"><img src={gmail} alt="gmail_logo" /></li>
                    <li className="cli-footer-li-right">+7 (812) 356-12-42</li>
                    <li className="phone-logo"><img src={phone} alt="phone_logo" /></li>
                </ul>
            </div>
        );
    }
}