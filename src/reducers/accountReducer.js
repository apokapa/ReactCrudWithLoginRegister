import * as types from '../actions/actionTypes';
import initialState from './initialState';

//Manages account actions
export default function accountReducer(state = initialState.loggedIn, action){

    if (action.type == types.LOGIN_USER_SUCCESS) {   
    return 1;
    }
    else if (action.type == types.REGISTER_USER_SUCCESS){
      return 1;
    }
    else if (action.type == types.LOGOUT_USER) {
      return  0;
    } 

  return state;
}