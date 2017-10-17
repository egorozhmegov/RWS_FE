import {
    GET_TRAINS,
    GET_TRAIN,
    DELETE_TRAIN,
    ADD_TRAIN,
    SET_ADD_TRAIN_SUCCESS_MESSAGE,
    SET_ADD_TRAIN_ERROR_MESSAGE,
    GET_ROUTE,
    SET_ADD_ROUTE_POINT_SUCCESS_MESSAGE,
    SET_ADD_ROUTE_POINT_ERROR_MESSAGE,
    ADD_ROUTE_POINT,
    DELETE_ROUTE_POINT,
    FILTER_TRAINS
} from '../constants/Train';

const initialState = {
    trains: [],
    filterTrains: [],
    route: [],
    train: {
        number: ''
    },
    addTrainSuccessMessage: '',
    addTrainErrorMessage: '',
    addRoutePointSuccessMessage: '',
    addRoutePointErrorMessage: ''
};

export default function trainReducer(state = initialState, action) {
    switch (action.type) {

        case GET_TRAINS:
            return {
                ...state,
                trains: action.payload,
                filterTrains: action.payload
            };

        case GET_TRAIN:
            return {
                ...state,
                train: state.trains.filter(train => train.id === action.payload)
            };

        case DELETE_ROUTE_POINT:
            return {
                ...state,
                route: state.route.filter(route => route.station.title !== action.payload.station.title)
            };

        case DELETE_TRAIN:
            return {
                ...state,
                trains: state.trains.filter(train => train.id !== action.payload)
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

        case SET_ADD_TRAIN_SUCCESS_MESSAGE:
            return {
                ...state,
                addTrainSuccessMessage: action.payload
            };

        case SET_ADD_TRAIN_ERROR_MESSAGE:
            return {
                ...state,
                addTrainErrorMessage: action.payload
            };

        case SET_ADD_ROUTE_POINT_SUCCESS_MESSAGE:
            return {
                ...state,
                addRoutePointSuccessMessage: action.payload
            };

        case SET_ADD_ROUTE_POINT_ERROR_MESSAGE:
            return {
                ...state,
                addRoutePointErrorMessage: action.payload
            };

        case FILTER_TRAINS:
            return {
                ...state,
                trains: action.payload
            };

        default:
            return state;
    }
}