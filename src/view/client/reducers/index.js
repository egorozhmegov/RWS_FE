import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ticketReducer from './ticketReducer'
import scheduleReducer from './scheduleReducer'

export default combineReducers({
    routing: routerReducer,
    ticketReducer,
    scheduleReducer
});