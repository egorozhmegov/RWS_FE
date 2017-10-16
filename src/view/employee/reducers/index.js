import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import employeeReducer from './employeeReducer';
import trainReducer from './trainReducer';
import stationReducer from './stationReducer';
import passengerReducer from './passengerReducer';

export default combineReducers({
    routing: routerReducer,
    employeeReducer,
    trainReducer,
    stationReducer,
    passengerReducer
});