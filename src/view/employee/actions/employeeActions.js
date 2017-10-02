import axios from 'axios';
import store from '../store/configStore';
import {push} from 'connected-react-router';
import {SET_ERROR_LOGIN_MESSAGE, SET_ERROR_REGISTER_MESSAGE, SET_SUCCESS_MESSAGE} from '../constants/Employee';
import {LOCAL_HOST} from '../constants/Main';

export function loginEmployee(employee) {
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'loginEmployee',
            data: employee,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(() => {
                store.dispatch(push('/rws/employee/train'));
            })
            .catch(() => {
                setErrorLoginMessage('Invalid login or password');
                store.dispatch(push('/rws/employee/login'));
            });
    }
}

export function logoutEmployee() {
    axios({
        method: 'GET',
        url: LOCAL_HOST + 'logoutEmployee',
        withCredentials: true
    })
        .then(() => {
            setErrorLoginMessage('');
            store.dispatch(push('/rws/employee/login'));
        })
        .catch(() => {
            store.dispatch(push('/rws/employee/login'));
        })
}

export function registerEmployee(employee){
    return () => {
        axios({
            method: 'POST',
            url: LOCAL_HOST + 'registerEmployee',
            data: employee,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                if(response.data === true){
                    setErrorRegisterMessage('');
                    setSuccessMessage(employee.employeeFirstName + ' ' + employee.employeeLastName + ' successfully registered');
                } else {
                    setSuccessMessage('');
                    setErrorRegisterMessage('Such employee does not exist');
                }
            })

    }
}

export function setErrorLoginMessage(message){
    store.dispatch({
        type: SET_ERROR_LOGIN_MESSAGE,
        payload: message
    });
    setTimeout(() => {
        store.dispatch({
            type: SET_ERROR_LOGIN_MESSAGE,
            payload: ''
        });
    }, 3000);
}

export function setErrorRegisterMessage(message){
    store.dispatch({
        type: SET_ERROR_REGISTER_MESSAGE,
        payload: message
    });
    setTimeout(() => {
        store.dispatch({
            type: SET_ERROR_REGISTER_MESSAGE,
            payload: ''
        });
    }, 10000);
}

export function setSuccessMessage(message) {
    store.dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: message
    });
    setTimeout(() => {
        store.dispatch({
            type: SET_SUCCESS_MESSAGE,
            payload: ''
        });
    }, 10000);
}