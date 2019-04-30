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