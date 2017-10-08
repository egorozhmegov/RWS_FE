import {GET_STATIONS,
    DELETE_STATION,
    ADD_STATION,
    SET_ADD_STATION_SUCCESS_MESSAGE,
    SET_ADD_STATION_ERROR_MESSAGE} from '../constants/Station';

const initialState = {
    stations: [],
    addStationSuccessMessage: '',
    addStationErrorMessage: '',
};

export default function trainReducer(state = initialState, action) {
    switch (action.type) {

        case GET_STATIONS:
            return {
                ...state,
                stations: action.payload
            };

        case ADD_STATION:
            return {
                ...state,
                stations: [
                    ...state.stations,
                    action.payload
                ]
            };

        case DELETE_STATION:
            return {
                ...state,
                stations: state.stations.filter(station => station.id !== action.payload)
            };

        case SET_ADD_STATION_SUCCESS_MESSAGE:
            return {
                ...state,
                addStationSuccessMessage: action.payload
            };

        case SET_ADD_STATION_ERROR_MESSAGE:
            return {
                ...state,
                addStationErrorMessage: action.payload
            };

        default:
            return state;
    }
}