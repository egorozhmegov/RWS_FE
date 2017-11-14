import store from '../store/configStore';
import axios from 'axios';
import { push } from 'connected-react-router';
import { GET_STATIONS, GET_TRAINS } from '../constants/Timetable';
import {LOCAL_HOST} from '../constants/Main';

export function getListStations(){
    axios({
        method: 'GET',
        url: LOCAL_HOST + 'getStations',
        withCredentials: true
    })
        .then((response) => {
            store.dispatch({
                type: GET_STATIONS,
                payload: response.data
            })
        })
}

export function getListTrains() {
    axios({
        method: 'GET',
        url: LOCAL_HOST + 'getTrains',
        withCredentials: true
    })
        .then((response) => {
            store.dispatch({
                type: GET_TRAINS,
                payload: response.data
            })
        })
        .catch(() => {
            store.dispatch(push('/rws/employee/login'));
        })
}

export function sendTimetableMessage(message){
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'sendMessage',
            data: message,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .catch((error) => {
                console.log(error)
            })
    }
}