import store from '../store/configStore';
import axios from 'axios';
import {LOCAL_HOST} from '../constants/ClientMain';
import {GET_STATIONS, GET_TRAINS, GET_TRAIN_INFO, SET_ERROR_MESSAGE, GET_TRAIN} from '../constants/Ticket';
import {push} from 'connected-react-router';

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
                store.dispatch({
                    type: GET_TRAINS,
                    payload: response.data
                })
            })
            .then(() => {
                store.dispatch({
                    type: GET_TRAIN_INFO,
                    payload: request
                })
            })
            .then(store.dispatch(push('/rws/client/tickets/trains')))
            .catch(setErrorMessage('Trains not found'))
    }
}

export function setErrorMessage(message){
    return store.dispatch({
            type: SET_ERROR_MESSAGE,
            payload: message
        })
}