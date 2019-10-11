import axios from 'axios';
import { SIGN_UP_SUCCESS, REMOVE_ALERTS, SIGN_UP_ERROR, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT } from './types';

export const removeAlerts = () => dispatch => {
    dispatch({ type: REMOVE_ALERTS });
}

export const signUp = values => async dispatch => {
    console.log(values)
    try {
        const res = await axios.post('/api/auth/signUp', values);
        dispatch({ type: SIGN_UP_SUCCESS, payload: res.data });
    } catch(err){
        dispatch({ type: SIGN_UP_ERROR, payload: err });
    }
}

export const signIn = values => async dispatch => {
    try {
        const res = await axios.post('/api/auth/signIn', values);
        localStorage.setItem('token', res.data.token);
        dispatch({ type: SIGN_IN_SUCCESS, payload: res.data });
    } catch(err){
        dispatch({ type: SIGN_IN_ERROR, payload: err });
    }
}

export const signOut = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: SIGN_OUT });
}