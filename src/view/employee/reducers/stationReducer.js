import {
    GET_STATIONS,
    DELETE_STATION,
    ADD_STATION,
    FILTER_STATIONS,
    SET_ADD_STATION_SUCCESS_MESSAGE,
    SET_ADD_STATION_ERROR_MESSAGE,
    SET_CENTER
} from '../constants/Station';

const initialState = {
    stations: [],
    filterStations: [],
    addStationSuccessMessage: '',
    addStationErrorMessage: '',
    center: { lat: 41.9, lng: -87.624 }
};

export default function trainReducer(state = initialState, action) {
    switch (action.type) {

        case SET_CENTER:
            return {
                ...state,
                center: action.payload
            };

        case GET_STATIONS:
            return {
                ...state,
                stations: action.payload,
                filterStations: action.payload
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

        case FILTER_STATIONS:
            return {
                ...state,
                stations: action.payload
            };

        default:
            return state;
    }
}