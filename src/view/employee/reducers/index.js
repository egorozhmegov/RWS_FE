import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import employeeReducer from './employeeReducer';
import trainReducer from './trainReducer';

export default combineReducers({
    routing: routerReducer,
    employeeReducer,
    trainReducer
});