import { 
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    REMOVE_ALERTS,
    SIGN_OUT
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case REMOVE_ALERTS:
            return { ...state, alert: false }
        case SIGN_UP_SUCCESS:
            return { ...state, alert: { message: 'User successfully registered.', color: 'green' } };
        case SIGN_UP_ERROR:
            return { ...state, alert: { message: 'Username already exists.', color: 'red' } };
        case SIGN_IN_SUCCESS:
            return { ...state, authenticated: true }
        case SIGN_IN_ERROR:
            return { ...state, alert: { message: 'Oops! There were no records found.', color: 'red' } };
        case SIGN_OUT:
            return { ...state, authenticated: false }
        default:
            return state;
    }
}