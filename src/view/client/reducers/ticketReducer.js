import {GET_STATIONS, GET_TRAINS, GET_TRAIN_INFO, SET_ERROR_MESSAGE, SET_TRAIN, GET_WAIPOINTS, SET_WAIPOINTS} from '../constants/Ticket';
import * as ticketActions from '../actions/ticketActions';

const initialState = {
    stations:  ticketActions.getListStations(),
    trains: [],
    train: {},
    trainNumber: '',
    trainInfo: {
        stationFrom: {
            title: ''
        },
        stationTo: {
            title: ''
        },
        departDate: []
    },
    errorMessage: '',
    waypoints: []
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

        case SET_TRAIN:
            return {
                ...state,
                train: action.payload,
                trainNumber: action.payload.train.number
            };

        case GET_TRAIN_INFO:
            return {
                ...state,
                trainInfo: action.payload,
            };

        case GET_WAIPOINTS:
            return {
                ...state,
                waypoints: [
                    ...state.waypoints,
                    action.payload
                ]
            };

        case SET_WAIPOINTS:
            return {
                ...state,
                waypoints: action.payload
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