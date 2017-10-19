import {GET_STATIONS} from '../constants/Schedule';

const initialState = {
    stations: [
        {title: 'znamensk'},
        {title: 'volgograd'}
    ]
};

export default function scheduleReducer(state = initialState, action) {
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