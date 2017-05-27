import { combineReducers } from 'redux';
import * as reducers from './reducers';
console.log(reducers);
const rootReducer = combineReducers(reducers);

export default rootReducer;