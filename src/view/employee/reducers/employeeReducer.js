import {SET_ERROR_LOGIN_MESSAGE, SET_ERROR_REGISTER_MESSAGE, SET_SUCCESS_MESSAGE, LOGIN_EMPLOYEE} from '../constants/Employee';

export const initialState = {
    employees: [],
    errorLoginMessage: '',
    errorRegisterMessage: '',
    successMessage: ''
};

export default function employeeReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_EMPLOYEE:
            return {
                ...state,
                employees: [
                    ...state.employees,
                    action.payload
                ]
            };

        case SET_ERROR_LOGIN_MESSAGE:
            return {
                ...state,
                errorLoginMessage: action.payload
            };

        case SET_ERROR_REGISTER_MESSAGE:
            return {
                ...state,
                errorRegisterMessage: action.payload
            };

        case SET_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: action.payload
            };

        default:
            return state;
    }
}
