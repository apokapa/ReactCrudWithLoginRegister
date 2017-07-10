import * as types from './actionTypes';
import mockApi from '../api/mockApi';
import realApi from '../api/realApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';



export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products};
}

export function createProductSuccess(product) {
  return {type: types.CREATE_PRODUCT_SUCCESS, product};
}

export function updateProductSuccess(product) {
  return {type: types.UPDATE_PRODUCT_SUCCESS, product};
}

export function deleteProductSuccess(productId) {
    return {type: types.DELETE_PRODUCT_SUCCESS, productId};
}

export function loadCategoriesSuccess(categories) {
  return {type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

//Load Categories
export function loadCategories() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return mockApi.getAllCategories().then(categories => {
      dispatch(loadCategoriesSuccess(categories));
    }).catch(error => {
      throw(error);
    });
  };
}


//Load products
export function loadProducts() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return realApi.getAllProducts().then(products => {
      dispatch(loadProductsSuccess(products));
    }).catch(error => {
      throw(error);
    });
  };
}

//Delete product
export function deleteProduct(productId) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return realApi.deleteProduct(productId).then(() => {
            dispatch(deleteProductSuccess(productId));
        }).catch((error) => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

//Save product
export function saveProduct(product) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return realApi.saveProduct(product).then(product => {
      product.Id ? dispatch(updateProductSuccess(product)) :
        dispatch(createProductSuccess(product));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
