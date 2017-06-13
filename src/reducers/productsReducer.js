import * as types from '../actions/actionTypes';
import initialState from './initialState';

//Manages product action
export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;

    case types.CREATE_PRODUCT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.product)
      ];

    case types.UPDATE_PRODUCT_SUCCESS:
      return [
        ...state.filter(product => product.Id !== action.product.Id),
        Object.assign({}, action.product)
      ];

    case types.DELETE_PRODUCT_SUCCESS:
        return [
          ...state.filter((product) => product.Id !== action.productId)];


    default:
      return state;
  }
}
