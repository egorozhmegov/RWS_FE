import axios from 'axios';
import store from '../store/configStore';
import {push} from 'connected-react-router';
import {SET_ERROR_LOGIN_MESSAGE,
    SET_ERROR_REGISTER_MESSAGE,
    SET_SUCCESS_MESSAGE} from '../constants/Employee';
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
                if (response.status === 201) {
                    store.dispatch(push('/rws/employee/login'));
                } else if (response.status === 204) {
                    setSuccessMessage('');
                    setErrorRegisterMessage('This employee does not exist in company');
                } else  {
                    setSuccessMessage('Employee successfully registered');
                    setErrorRegisterMessage('');
                }
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    setSuccessMessage('');
                    setErrorRegisterMessage('Email is exist already');
                } else if (error.response.status === 302) {
                    setSuccessMessage('');
                    setErrorRegisterMessage('Login is exist already');
                } else {
                    setSuccessMessage('');
                    setErrorRegisterMessage('Invalid register data');
                }
            });
    }
}

export function setErrorLoginMessage(message){
    store.dispatch({
        type: SET_ERROR_LOGIN_MESSAGE,
        payload: message
    });
}

export function setErrorRegisterMessage(message){
    store.dispatch({
        type: SET_ERROR_REGISTER_MESSAGE,
        payload: message
    });
}

export function setSuccessMessage(message) {
    store.dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: message
    });
}