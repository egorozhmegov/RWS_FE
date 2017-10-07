import {
    GET_TRAINS,
    GET_TRAIN,
    DELETE_TRAIN,
    ADD_TRAIN,
    SET_ADD_TRAIN_MESSAGE,
    GET_ROUTE,
    SET_ADD_ROUTE_POINT_MESSAGE,
    ADD_ROUTE_POINT
} from '../constants/Train';

const initialState = {
    trains: [],
    route: [],
    train:{
        number: ''
    },
    addTrainMessage: '',
    addRoutePointMessage: ''
};

export default function trainReducer(state = initialState, action) {
    switch (action.type) {

        case GET_TRAINS:
            return {
                ...state,
                trains: action.payload
            };

        case GET_TRAIN:
            return {
                ...state,
                train: state.trains.filter(train => train.id === action.payload)
            };

        case DELETE_TRAIN:
            let id = action.payload;
            return {
                ...state,
                trains: state.trains.filter(train => train.id !== id)
            };

        case ADD_TRAIN:
            return {
                ...state,
                trains: [
                    ...state.trains,
                    action.payload
                ]
            };

        case GET_ROUTE:
            return {
                ...state,
                route: action.payload
            };

        case ADD_ROUTE_POINT:
            return {
                ...state,
                route: [
                    ...state.route,
                    action.payload
                ]
            };

        case SET_ADD_TRAIN_MESSAGE:
            return {
                ...state,
                addTrainMessage: action.payload
            };

        case SET_ADD_ROUTE_POINT_MESSAGE:
            return {
                ...state,
                addRoutePointMessage: action.payload
            };

        default:
            return state;
    }
}