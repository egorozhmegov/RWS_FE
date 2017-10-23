import {GET_STATIONS,
    GET_SCHEDULE
} from '../constants/Schedule';

const initialState = {
    stations: [],
    schedule: {
        arriveSchedule: [],
        departSchedule: []
    }
};

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STATIONS:
            return {
                ...state,
                stations: action.payload,
            };

        case GET_SCHEDULE:
            return {
                ...state,
                schedule:{
                    arriveSchedule: action.payload.arrivalSchedule,
                    departSchedule: action.payload.departureSchedule
                }
            };

        default:
            return state;
    }
}