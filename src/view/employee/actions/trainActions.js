import store from '../store/configStore';
import axios from 'axios';
import { push } from 'connected-react-router';
import {GET_TRAINS, DELETE_TRAIN, ADD_TRAIN, SET_ADD_TRAIN_MESSAGE, GET_ROUTE, SET_ADD_ROUTE_POINT_MESSAGE} from '../constants/Train';
import {LOCAL_HOST} from '../constants/Main';

export function getListTrains(){
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

export function deleteTrain(id){
    return (dispatch) => {
        axios({
            method: 'DELETE',
            url: LOCAL_HOST + 'deleteTrain/'+id,
            withCredentials: true
        })
            .then((response) => {
                store.dispatch({
                    type: DELETE_TRAIN,
                    payload: response.data
                })
            })
            .catch(() => {
                store.dispatch(push('/rws/employee/train'));
            })
    }
}

export function addTrain(train){
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'addTrain',
            data: train,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                if(response.status === 201){
                    store.dispatch({
                        type: ADD_TRAIN,
                        payload: response.data
                    });
                    setAddTrainMessage('')
                } else {
                    setAddTrainMessage('Train exist already')
                }
            })
    }
}

export function getRoute(id){
    return () => {
        axios({
            method: 'GET',
            url: LOCAL_HOST + 'getRoute/' + id,
            withCredentials: true
        })
            .then((response) => {
                store.dispatch({
                    type: GET_ROUTE,
                    payload: response.data
                })
            })
    };
}

export function addRoutePoint(routePoint){
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'addRoutePoint',
            data: routePoint,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                console.log("OK")
            })
    }
}

export function setAddTrainMessage(message){
    store.dispatch({
        type: SET_ADD_TRAIN_MESSAGE,
        payload: message
    })
}

export function setAddRoutePointMessage(message){
    store.dispatch({
        type: SET_ADD_ROUTE_POINT_MESSAGE,
        payload: message
    })
}