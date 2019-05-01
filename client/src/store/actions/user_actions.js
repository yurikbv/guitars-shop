import axios from 'axios';

import { USER_SERVER } from "../../utils/misc";
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