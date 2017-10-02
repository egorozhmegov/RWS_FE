import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import {Provider} from 'react-redux';
import history from './view/history/configHistory';
import { ConnectedRouter } from 'connected-react-router';
import store from './view/employee/store/configStore';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
