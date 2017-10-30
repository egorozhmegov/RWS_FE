import {GET_STATIONS, GET_TRAINS, GET_TRAIN_INFO, SET_ERROR_MESSAGE, GET_TRAIN} from '../constants/Ticket';

const initialState = {
    stations: [],
    trains: [],
    train: {},
    trainInfo: {
        stationFrom: {
            title: ''
        },
        stationTo: {
            title: ''
        },
        departDate: []
    },
    errorMessage: ''
};

export default function ticketReducer(state = initialState, action) {
    switch (action.type) {

        case GET_STATIONS:
            return {
                ...state,
                stations: action.payload,
            };

        case GET_TRAINS:
            return {
                ...state,
                trains: action.payload,
            };

        case GET_TRAIN:
            return {
                ...state,
                train: action.payload,
            };

        case GET_TRAIN_INFO:
            return {
                ...state,
                trainInfo: action.payload,
            };

        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload,
            };

        default:
            return state;
    }
}