import {
    FETCH_PROJECT_USER,
    CREATE_NEW_USER
} from '../actions/types';

export default function (state={},action){
    switch(action.type){
        case CREATE_NEW_USER:
                return { ...state, allUsers: [...state.allUsers,action.payload.data] };
        case FETCH_PROJECT_USER:        
                return { ...state, allUsers: action.payload.data };
        default:
            return state;
    }
} 