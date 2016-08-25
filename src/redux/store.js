import { createStore } from 'redux';
import combinedReducer from './combinedReducer';

export default createStore(combinedReducer);
