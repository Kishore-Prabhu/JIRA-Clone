 import axios from 'axios';
import { FETCH_USER, FETCH_PROJECTS, FETCH_ALL_USERS, FETCH_ISSUES } from './types';

export const fetchUser = () => async dispatch => {
    try {
        const response = await axios.get('/api/current_user',
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_USER, payload: response });
    } catch(err){
        console.log(err);
    }
}

export const fetchProjects = () => async dispatch => {
    try {
        const response = await axios.get('/api/admin/projects',
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_PROJECTS, payload: response });
    } catch(err){
        console.log(err);
    }
}

export const fetchAllUsers = () => async dispatch => {
    try {
        const response = await axios.get('/api/affiliated',
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_ALL_USERS, payload: response });
    } catch(err){
        console.log(err);
    }
}

export const fetchIssues = () => async dispatch => {
    try {
        const response = await axios.get('/api/issue/',
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_ISSUES, payload: response });
    } catch(err){
        console.log(err);
    }
}