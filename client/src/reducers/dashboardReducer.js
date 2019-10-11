import {
    FETCH_USER,
    FETCH_PROJECTS,
    FETCH_ALL_USERS,
    FETCH_ISSUES,
    FETCH_PROJECT
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_USER:
            return { ...state, user: action.payload.data };
        case FETCH_PROJECTS:
            return { ...state, projects: action.payload.data };
        case FETCH_ALL_USERS:
            return { ...state, allUsers: action.payload.data };
        case FETCH_ISSUES:
            return { ...state, issues: action.payload.data };
        default:
            return state;
    }

    return state;
}