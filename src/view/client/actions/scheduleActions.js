import store from '../store/configStore';
import axios from 'axios';
import {LOCAL_HOST} from '../constants/ClientMain';
import {GET_STATIONS,
    GET_SCHEDULE
} from '../constants/Schedule';

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

export function getSchedule(station, date) {
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'getSchedule',
            data: {
                'station': station,
                'date': [
                    date._d.getFullYear(),
                    date._d.getMonth() + 1,
                    date._d.getDate()
                ]
            },
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                store.dispatch({
                    type: GET_SCHEDULE,
                    payload: response.data
                });
            })
    }
}