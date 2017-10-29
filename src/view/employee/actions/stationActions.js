import store from '../store/configStore';
import axios from 'axios';
import { push } from 'connected-react-router';
import {GET_STATIONS,
    DELETE_STATION,
    ADD_STATION,
    FILTER_STATIONS,
    SET_ADD_STATION_SUCCESS_MESSAGE,
    SET_ADD_STATION_ERROR_MESSAGE,
    SET_CENTER,
    OPEN_SNACKBAR} from '../constants/Station';
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
            .then(openSnackbar({open:true, message: 'Station successfully deleted'}))
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
                    setAddStationErrorMessage('Station exist already')
                }
            })
            .then(openSnackbar({open:true, message: 'Station successfully created'}))
    }
}

export function setAddStationSuccessMessage(message){
    store.dispatch({
        type: SET_ADD_STATION_SUCCESS_MESSAGE,
        payload: message
    });
}

export function setAddStationErrorMessage(message){
    store.dispatch({
        type: SET_ADD_STATION_ERROR_MESSAGE,
        payload: message
    });
}

export function filter(listStations){
    return () => {
        store.dispatch({
            type: FILTER_STATIONS,
            payload: listStations
        })
    }
}

export function setMapCenter(center) {
    return () => {
        store.dispatch({
            type: SET_CENTER,
            payload: center
        });
    }
}

export function openSnackbar(snackbar) {
    return () => {
        store.dispatch({
            type: OPEN_SNACKBAR,
            payload: snackbar
        })
    }
}