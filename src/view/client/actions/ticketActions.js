import store from '../store/configStore';
import {push} from 'connected-react-router';
import axios from 'axios';
import {LOCAL_HOST} from '../constants/ClientMain';
import {
    GET_STATIONS,
    GET_TRAINS,
    GET_TRAIN_INFO,
    SET_ERROR_MESSAGE,
    SET_TRAIN, GET_WAIPOINTS,
    SET_WAIPOINTS,
    OPEN_SNACKBAR,
    SET_PASSENGER,
    ERROR_PAY_MESSAGE,
    SUCCESS_PAY_MESSAGE} from '../constants/Ticket';

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
                });
                store.dispatch(push('/rws/client/tickets/trains'));
            })
            .catch(() => {
                setErrorMessage('Trains not found');
                store.dispatch(push('/rws/client/tickets'));
            })
    }
}

export function setTrain(train){
    return store.dispatch({
        type: SET_TRAIN,
        payload: train
    })
}

export function getWaypoint(route){
    let waypoints;

    if(route.length > 3){
        waypoints = route.slice(1, route.length - 2);
    } else {
        waypoints = [route[1]];
    }


    return () => {
        waypoints.map((point) => {
            return store.dispatch({
                type: GET_WAIPOINTS,
                payload: {location: point.station.title}
            })
        })
    }
}

export function setWaypoint(point){
    return store.dispatch({
        type: SET_WAIPOINTS,
        payload: point
    })
}

export function setErrorMessage(message){
    return store.dispatch({
            type: SET_ERROR_MESSAGE,
            payload: message
        })
}

export function setErrorPayMessage(message){
    return store.dispatch({
        type: ERROR_PAY_MESSAGE,
        payload: message
    })
}

export function setSuccessPayMessage(message){
    return () => {
        store.dispatch({
            type: SUCCESS_PAY_MESSAGE,
            payload: message
        })
    }
}

export function setPassenger(passenger){
    return store.dispatch({
        type: SET_PASSENGER,
        payload: passenger
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

export function buyTicket(ticketData){
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'payment',
            data: ticketData,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(setSuccessPayMessage('Successfully payment. Ticket send on email: '
                + ticketData.userEmail))
            .catch((error) => {
                if(error.response.status === 400){
                    setErrorPayMessage('Invalid payment data')
                } else if(error.response.status === 403){
                    setErrorPayMessage('Train departed already')
                } else if(error.response.status === 302){
                    setErrorPayMessage('Passenger ' +
                        ticketData.passenger.passengerFirstName + ' ' +
                        ticketData.passenger.passengerLastName + ' ' +
                        'registered already'
                    );
                } else {
                    console.log(error);
            }
            })
    }
}