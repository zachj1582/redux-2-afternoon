import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/userReducer';
import budgetReducer from './ducks/budgetReducer';

const rootReducer = combineReducers({
  user: userReducer,
  budget: budgetReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));