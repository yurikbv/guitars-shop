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
    default:
      return state;
  }
}