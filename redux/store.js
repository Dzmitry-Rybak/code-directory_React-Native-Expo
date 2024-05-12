import { createStore, combineReducers } from 'redux';
import {questionsReducer, filterReducer} from './reducers';

const rootReducer = combineReducers({questionsReducer, filterReducer})

const store = createStore(rootReducer);

export default store;
