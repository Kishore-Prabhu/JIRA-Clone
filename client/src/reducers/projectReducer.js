import {
    FETCH_ALL_PROJECTS,
    CREATE_PROJECT
} from '../actions/types';

export default function (state={},action){
    switch(action.type){
        case CREATE_PROJECT:
            return { ...state,projects:[...state.projects,action.payload.data],project_created:true}
        case FETCH_ALL_PROJECTS:
            return { ...state, projects: action.payload.data };
        default:
            return state;
    }

} 