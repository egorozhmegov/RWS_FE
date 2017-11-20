import store from '../store/configStore';
import axios from 'axios';
import { push } from 'connected-react-router';
import { GET_STATIONS, GET_TRAINS, ADD_MESSAGE } from '../constants/Timetable';
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
            .then(() => {
                let currentdate = new Date();
                let date = currentdate.getDate();
                if(date.toString().length === 1){date = '0' + date;}
                let month = currentdate.getMonth()+1;
                if(month.toString().length === 1) {month = '0' + month;}
                let year = currentdate.getFullYear();
                let hour = currentdate.getHours();
                if(hour.toString().length === 1) {hour = '0' + hour;}
                let min = currentdate.getMinutes();
                if(min.toString().length === 1) {min = '0' + min;}
                let resultDate = date+"."+month+"."+year+", "+hour+":"+min;
                let notice = resultDate + ' -  NOTICE: station: ' + message.station
                    + ', train: ' + message.train + ', status: ' + message.status +
                    ', message: ' + message.message;

                store.dispatch({
                    type: ADD_MESSAGE,
                    payload: notice
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}