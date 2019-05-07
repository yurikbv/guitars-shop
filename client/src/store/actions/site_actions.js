import axios from 'axios';
import { SITE_SERVER } from "../../utils/misc";
import * as actionTypes from './types';

export function getSiteData() {
  const request = axios.get(`${SITE_SERVER}/site_data`)
      .then(response => response.data);
  return {
    type: actionTypes.GET_SITE_DATA,
    payload: request
  }
}

export function updateSiteData(dataToSubmit) {
  const request = axios.post(`${SITE_SERVER}/site_data`, dataToSubmit)
      .then(response => response.data);
  return {
    type: actionTypes.UPDATE_SITE_DATA,
    payload: request
  }
}


