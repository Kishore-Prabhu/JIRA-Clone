import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { SIGN_IN_SUCCESS } from './actions/types';

import 'typeface-roboto';
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const token = localStorage.getItem('token');

if(token){
    store.dispatch({ type: SIGN_IN_SUCCESS });
}

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
)
