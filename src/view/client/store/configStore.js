import {createStore, applyMiddleware} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';
import history from '../history/configHistory';

const configStore = createStore(
    connectRouter(history)(reducer),
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

export default configStore;