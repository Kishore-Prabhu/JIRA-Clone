import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import projectReducer from './projectReducer'
import userReducer from './userReducer'
import issueReducer from './issueReducer'

export default combineReducers({
    form: reduxForm,
    auth: authReducer,
    dashboard: dashboardReducer,
    projects: projectReducer,
    projectUsers: userReducer,
    issues:issueReducer
})