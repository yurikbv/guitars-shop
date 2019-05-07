import axios from 'axios';

import { USER_SERVER, PRODUCT_SERVER } from "../../utils/misc";
import * as actionTypes from './types';

export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
      .then(response => response.data);
  return {
    type: actionTypes.LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
      .then(response => response.data);
  return {
    type: actionTypes.REGISTER_USER,
    payload: request
  }
}

export function auth() {
  const request = axios.get(`${USER_SERVER}/auth`)
      .then(response => response.data);
  return {
    type: actionTypes.AUTH_USER,
    payload: request
  }
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`)
      .then(response => response.data);
  return{
    type: actionTypes.LOGOUT_USER,
    payload: request
  }
}

export function addToCart(_id) {

  const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
      .then(response => response.data);
  return {
    type: actionTypes.ADD_TO_CART_USER,
    payload: request
  }
}

export function getCartItems(cartItems, userCart) {
  const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
      .then(response => {
        userCart.forEach(item => {
          response.data.forEach((k,i) => {
            if(item.id === k._id){
              response.data[i].quantity = item.quantity;
            }
          })
        });
        
        return response.data;
      });

  return {
    type: actionTypes.GET_CART_ITEMS,
    payload: request
  }
}

export function removeCartItem(id) {
  const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
      .then(response => {
        response.data.cart.forEach(item => {
          response.data.cartDetail.forEach((k,i) => {
            if(item.id === k._id){
              response.data.cartDetail[i].quantity = item.quantity;
            }
          })
        });
        return response.data;
      });
  return {
    type: actionTypes.REMOVE_CART_ITEM,
    payload: request
  }
}

export function onSuccessBuy(data) {

  const request = axios.post(`${USER_SERVER}/successBuy`,data)
      .then(response => response.data);
  return {
    type: actionTypes.ON_SUCCESS_BUY_USER,
    payload: request
  }
}

export function updateUserProfile(data) {
  const request = axios.post(`${USER_SERVER}/update_profile`,data)
      .then(response => response.data);
  return {
    type: actionTypes.UPDATE_USER_PROFILE,
    payload: request
  }
}

export function clearUpdateUser() {
  return {
    type: actionTypes.CLEAR_UPDATE_USER,
    payload: ''
  }
}

