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
    default:
      return state;
  }
}