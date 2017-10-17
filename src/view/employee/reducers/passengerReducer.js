import {GET_PASSENGERS, FILTER_PASSENGERS} from '../constants/Passenger';

const initialState = {
    passengers: [],
    filterPassengers: []
};

export default function passengerReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PASSENGERS:
            return {
                ...state,
                passengers: action.payload,
                filterPassengers: action.payload
            };

        case FILTER_PASSENGERS:
            return {
                ...state,
                filterPassengers: action.payload
            };

        default:
            return state;
    }
}