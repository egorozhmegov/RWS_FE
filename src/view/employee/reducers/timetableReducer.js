import {GET_STATIONS, GET_TRAINS, ADD_MESSAGE} from '../constants/Timetable';

const initialState = {
    stations: [],
    trains: [],
    messages: []
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

        case ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            };

        default:
            return state;
    }
}