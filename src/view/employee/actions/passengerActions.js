import store from '../store/configStore';
import axios from 'axios';
import { push } from 'connected-react-router';
import {LOCAL_HOST} from '../constants/Main';
import {GET_PASSENGERS, FILTER_PASSENGERS} from '../constants/Passenger';

export function getListPassengers(){
    axios({
        method: 'GET',
        url: LOCAL_HOST + 'getPassengers',
        withCredentials: true
    })
        .then((response) => {
            store.dispatch({
                type: GET_PASSENGERS,
                payload: response.data
            })
        })
        .catch(() => {
            store.dispatch(push('/rws/employee/login'));
        })
}

export function filter(listPassengers){
    return () => {
        store.dispatch({
            type: FILTER_PASSENGERS,
            payload: listPassengers
        })
    }
}
