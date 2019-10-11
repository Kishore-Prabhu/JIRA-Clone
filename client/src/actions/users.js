import axios from 'axios'
import { FETCH_PROJECT_USER, CREATE_NEW_USER } from './types';

export const fetchAllUsers = () => async dispatch => {
    try {
        const response = await axios.get('/api/affiliated',
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_PROJECT_USER, payload: response });
    } catch(err){
        console.log(err);
    }
}

export const createNewUser = (values) => async dispatch => {
    console.log("NEW User",values)
    try {
        const response = await axios.post('/api/admin/createUser', values,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: CREATE_NEW_USER, payload: response });
    } catch(err){
        console.log(err);
    }
}
