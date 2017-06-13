import * as types from './actionTypes';

export function beginAjaxCall() {
  return {type: types.BEGIN_AJAX_CALL};
} //Ajax call starts

export function ajaxCallError() {
  return {type: types.AJAX_CALL_ERROR};
} //Ajax call error

