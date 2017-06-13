import * as types from './actionTypes';
import mockApi from '../api/mockApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

//Fires Login user success login action
export function loginUserSuccess() {
  return {type: types.LOGIN_USER_SUCCESS};
}

//Regiser
export function registerUserSuccess() {
  return {type: types.REGISTER_USER_SUCCESS};
}

//Fires logout user action
export function logout() {
  return {type: types.LOGOUT_USER};
}

//Mock Api call , on successs triggers loginUserSuccess
export function loginUser(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return mockApi.loginUser(user).then(() => {
     dispatch(loginUserSuccess()) 
    })
    .catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


//Register user
export function registerUser(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return mockApi.registerUser(user).then(user => {
        dispatch(registerUserSuccess(user));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

//No api for Logout, will be client side