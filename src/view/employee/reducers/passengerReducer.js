import {GET_PASSENGERS} from '../constants/Passenger';

const initialState = {
    passengers:[]
};

export default function passengerReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PASSENGERS:
            return {
                ...state,
                passengers: action.payload
            };

        default:
            return state;
    }
}