import {GET_STATIONS} from '../constants/Ticket';

const initialState = {
    stations: []
};

export default function ticketReducer(state = initialState, action) {
    switch (action.type) {

        case GET_STATIONS:
            return {
                ...state,
                stations: action.payload,
            };

        default:
            return state;
    }
}