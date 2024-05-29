import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import {questionsReducer, filterReducer} from './reducers';

const rootReducer = combineReducers({questionsReducer, filterReducer})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;