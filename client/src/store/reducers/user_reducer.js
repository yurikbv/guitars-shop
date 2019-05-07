import * as actionTypes from '../actions/types';

export default function (state={}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {...state, loginSuccess: action.payload};
    case actionTypes.REGISTER_USER:
      return {...state, register: action.payload};
    case actionTypes.AUTH_USER:
      return {...state, userData: action.payload};
    case actionTypes.LOGOUT_USER:
      return {...state};
    case actionTypes.ADD_TO_CART_USER:
      return {...state, userData: {
          ...state.userData,
          cart: action.payload
        }};
    case actionTypes.GET_CART_ITEMS:
      return {...state, cartDetail: action.payload};
    case actionTypes.REMOVE_CART_ITEM:
      return  {...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      };
    case actionTypes.ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        },
        cartDetail: action.payload.cartDetail
      };
    case actionTypes.UPDATE_USER_PROFILE:
      return {...state, updateUser: action.payload};
    case actionTypes.CLEAR_UPDATE_USER:
      return {...state,updateUser: action.payload};
    default:
      return state;
  }
}