import React, {Component} from 'react';
import CliHeader from "./CliHeader";
import CliMain from "./CliMain";
import CliFooter from "./CliFooter";
import {Provider} from 'react-redux';
import history from '../history/configHistory';
import { ConnectedRouter } from 'connected-react-router';
import store from './store/configStore';

export default class ClientApp extends Component {


    render() {
        return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <CliHeader />
                    <CliMain />
                    <CliFooter user = {this.props.user}/>
                </div>
            </ConnectedRouter>
        </Provider>
        );
    }
}
