import React, {Component} from 'react';
import '../css/CliFooter.css';
import gmail from '../img/gmail.svg';
import phone from '../img/telephone.svg';

export default class CliFooter extends Component {
    render() {
        return (
            <div>
                <ul className="footer">
                    <li><img className="user-profile" src={this.props.user.photoURL} alt="google-foto"/></li>
                    <li className="cli-footer-li"><strong>{this.props.user.displayName}</strong></li>
                    <li className="cli-footer-li-right-mail"><a href="mailto:rws.inf@gmail.com"><strong>rws.inf@gmail.com</strong></a></li>
                    <li className="gmail-logo"><img src={gmail} alt="gmail_logo" /></li>
                    <li className="cli-footer-li-right-phone"><strong>+7 (812) 356-12-42</strong></li>
                    <li className="phone-logo"><img src={phone} alt="phone_logo" /></li>
                </ul>
            </div>
        );
    }
}

