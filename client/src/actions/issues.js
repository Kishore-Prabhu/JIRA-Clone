import {
    CREATE_NEW_ISSUE,
    DELETE_ISSUE,
    EDIT_ISSUE,
    FETCH_CURRENT_ISSUE,
    FETCH_PROJECT_ISSUE
} from './types';

import axios from 'axios';

export const createIssue = (values,projectId) => async dispatch => {
    console.log("VALUES:",values,projectId)
    try{
        const res = await axios.post(`/api/issue/createIssue/${projectId}`,values,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: CREATE_NEW_ISSUE, payload: res.data})
    }catch(err){
        console.log("Error",err)
        // dispatch({ type: CREATE_NEW_ISSUE, payload: res.data})
    }
}


export const fetchIssues = (projectId) => async dispatch => {
    try {
        const response = await axios.get(`/api/issue/getIssues/${projectId}`,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_PROJECT_ISSUE, payload: response });
    } catch(err){
        console.log(err);
    }
}
