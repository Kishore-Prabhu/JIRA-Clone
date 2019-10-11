import axios from 'axios'
import { FETCH_ALL_PROJECTS, CREATE_PROJECT } from './types';

export const fetchProjects = () => async dispatch => {
    try {
        const response = await axios.get('/api/admin/projects',
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_ALL_PROJECTS, payload: response });
    } catch(err){
        console.log(err);
    }
}

export const createNewProject = (values) => async dispatch => {
    console.log("NEW PROJECT",values)
    try {
        const response = await axios.post('/api/admin/project', values,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: CREATE_PROJECT, payload: response });
    } catch(err){
        console.log(err);
    }
}
