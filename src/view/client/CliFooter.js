import React, {Component} from 'react';
import '../css/CliFooter.css';
import { Link } from 'react-router-dom';

export default class CliFooter extends Component {
    render() {
        return (
            <div>
                <ul className="footer">
                    <li><img className="user-profile" src={this.props.user.photoURL} alt="google-foto"/></li>
                    <li className="cli-footer-li">{this.props.user.displayName}</li>
                    <li className="cli-footer-li-right">Email: <Link to='#'>info@rws.com</Link></li>
                    <li className="cli-footer-li-right">Phone: +7(812) 356-12-42</li>
                </ul>
            </div>
        );
    }
}