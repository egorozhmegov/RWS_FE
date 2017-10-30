import store from '../store/configStore';
import axios from 'axios';
import {LOCAL_HOST} from '../constants/ClientMain';
import {GET_STATIONS} from '../constants/Ticket';

export function getListStations(){
    return () => {
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
}

export function searchTrains(request){
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'searchTrains',
            data: request,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data)
            })
    }
}