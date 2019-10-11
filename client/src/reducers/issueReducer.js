import {
    CREATE_NEW_ISSUE,
    EDIT_ISSUE,
    FETCH_PROJECT_ISSUE
} from '../actions/types';

export default function (state={},action){
    switch(action.type){
        case CREATE_NEW_ISSUE:
            console.log("STATETA",action.payload)
            return { ...state,projectIssues:[...state.projectIssues,action.payload]}
        case FETCH_PROJECT_ISSUE:
            return { ...state,projectIssues:action.payload.data}
        default:
            return state;
    }
} 