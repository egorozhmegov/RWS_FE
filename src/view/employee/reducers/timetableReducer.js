import { GET_STATIONS, GET_TRAINS } from '../constants/Timetable';

const initialState = {
    stations: [],
    trains: []
};

export default function timetableReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STATIONS:
            return {
                ...state,
                stations: action.payload
            };

        case GET_TRAINS:
            return {
                ...state,
                trains: action.payload
            };

        default:
            return state;
    }
}