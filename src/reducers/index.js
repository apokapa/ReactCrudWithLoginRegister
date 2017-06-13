import {combineReducers} from 'redux';
import products from './productsReducer';
import account from './accountReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

//combines and exposes reducers to the application
const rootReducer = combineReducers({
  products,
  account,
  ajaxCallsInProgress
});

export default rootReducer;
