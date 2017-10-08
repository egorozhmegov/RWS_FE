import store from '../store/configStore';
import axios from 'axios';
import { push } from 'connected-react-router';
import {GET_STATIONS,
    DELETE_STATION,
    ADD_STATION,
    SET_ADD_STATION_SUCCESS_MESSAGE,
    SET_ADD_STATION_ERROR_MESSAGE} from '../constants/Station';
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
        .catch(() => {
            store.dispatch(push('/rws/employee/login'));
        })
}

export function deleteStation(id){
    return () => {
        axios({
            method: 'DELETE',
            url: LOCAL_HOST + 'deleteStation/'+id,
            withCredentials: true
        })
            .then((response) => {
                store.dispatch({
                    type: DELETE_STATION,
                    payload: response.data
                })
            })
            .catch(() => {
                store.dispatch(push('/rws/employee/train'));
            })
    }
}

export function addStation(station){
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'addStation',
            data: station,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                if(response.status === 201){
                    store.dispatch({
                        type: ADD_STATION,
                        payload: response.data
                    });
                    setAddStationSuccessMessage('Station successfully created')
                } else {
                    setAddStationErrorMessage('Station exist already or incorrect data')
                }
            })
    }
}

export function setAddStationSuccessMessage(message){
    store.dispatch({
        type: SET_ADD_STATION_SUCCESS_MESSAGE,
        payload: message
    });
    setTimeout(() => {
        store.dispatch({
            type: SET_ADD_STATION_SUCCESS_MESSAGE,
            payload: ''
        });
    }, 4000);
}

export function setAddStationErrorMessage(message){
    store.dispatch({
        type: SET_ADD_STATION_ERROR_MESSAGE,
        payload: message
    });
    setTimeout(() => {
        store.dispatch({
            type: SET_ADD_STATION_ERROR_MESSAGE,
            payload: ''
        });
    }, 4000);
}