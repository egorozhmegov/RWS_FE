import store from '../store/configStore';
import axios from 'axios';
import {push} from 'connected-react-router';
import {
    GET_TRAINS,
    GET_TRAIN,
    DELETE_TRAIN,
    ADD_TRAIN,
    SET_ADD_TRAIN_SUCCESS_MESSAGE,
    SET_ADD_TRAIN_ERROR_MESSAGE,
    GET_ROUTE,
    ADD_ROUTE_POINT,
    SET_ADD_ROUTE_POINT_SUCCESS_MESSAGE,
    SET_ADD_ROUTE_POINT_ERROR_MESSAGE,
    DELETE_ROUTE_POINT,
    FILTER_TRAINS,
    GET_STATIONS,
    OPEN_SNACKBAR
} from '../constants/Train';
import {LOCAL_HOST} from '../constants/Main';

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

export function deleteTrain(id) {
    return () => {
        axios({
            method: 'DELETE',
            url: LOCAL_HOST + 'deleteTrain/' + id,
            withCredentials: true
        })
            .then((response) => {
                store.dispatch({
                    type: DELETE_TRAIN,
                    payload: response.data
                })
            })
            .then(openSnackbar({open:true, message: 'Train successfully deleted'}))
            .catch(() => {
                store.dispatch(push('/rws/employee/train'));
            })
    }
}

export function addTrain(train) {
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
                store.dispatch({
                        type: ADD_TRAIN,
                        payload: response.data
                    });
            })
            .then(openSnackbar({open:true, message: 'Train successfully created'}))
            .catch(() => {
                setAddTrainErrorMessage('Train is exist already');
            });
    }
}

export function getRoute(id) {
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

export function addRoutePoint(routePoint) {
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
                store.dispatch({
                    type: ADD_ROUTE_POINT,
                    payload: response.data
                });
                setAddRoutePointSuccessMessage('Route point successfully created')
            })
            .then(openSnackbar({open:true, message: 'Route point successfully created'}))
            .catch(() => {
                setAddRoutePointErrorMessage('Invalid data')
            })
    }
}

export function deleteRoutePoint(routePoint) {
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'deleteRoutePoint',
            data: routePoint,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                store.dispatch({
                    type: DELETE_ROUTE_POINT,
                    payload: response.data
                })
            })
            .then(openSnackbar({open:true, message: 'Route point successfully deleted'}))
            .catch(() => {
                store.dispatch(push('/rws/employee/train'));
            })
    }
}

export function setAddTrainSuccessMessage(message) {
    store.dispatch({
        type: SET_ADD_TRAIN_SUCCESS_MESSAGE,
        payload: message
    });
}

export function setAddTrainErrorMessage(message) {
    store.dispatch({
        type: SET_ADD_TRAIN_ERROR_MESSAGE,
        payload: message
    });
}

export function setAddRoutePointSuccessMessage(message) {
    store.dispatch({
        type: SET_ADD_ROUTE_POINT_SUCCESS_MESSAGE,
        payload: message
    });
}

export function setAddRoutePointErrorMessage(message) {
    store.dispatch({
        type: SET_ADD_ROUTE_POINT_ERROR_MESSAGE,
        payload: message
    });
}

export function getTrain(id) {
    return () => {
        store.dispatch({
            type: GET_TRAIN,
            payload: id
        })
    }
}

export function setEmptyTrains() {
    return () => {
        store.dispatch({
            type: GET_TRAIN,
            payload: []
        })
    }
}

export function filter(listTrains) {
    return () => {
        store.dispatch({
            type: FILTER_TRAINS,
            payload: listTrains
        })
    }
}

export function getListStations() {
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

export function openSnackbar(snackbar) {
    return () => {
        store.dispatch({
            type: OPEN_SNACKBAR,
            payload: snackbar
        })
    }
}