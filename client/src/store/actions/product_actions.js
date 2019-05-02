import axios from 'axios';

import { PRODUCT_SERVER } from "../../utils/misc";
import * as actionTypes from './types';

export function getProductsBySell() {
// ?sortBy=sold&order=desc&limit=4
  const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
      .then(response => response.data);
  return {
    type: actionTypes.GET_PRODUCTS_BY_SELL,
    payload: request
  }
}

export function getProductsByArrival() {
  const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
      .then(response => response.data);
  return {
    type: actionTypes.GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  }
}

///////////////////////////////////
////////   CATEGORIES   ///////////
///////////////////////////////////

export function getBrands() {
  const request = axios.get(`${PRODUCT_SERVER}/get_brands`).then(response => response.data);
  return {
    type: actionTypes.GET_BRANDS,
    payload: request
  }
}

export function getWoods() {
  const request = axios.get(`${PRODUCT_SERVER}/get_woods`).then(response => response.data);
  return {
    type: actionTypes.GET_WOODS,
    payload: request
  }
}

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
  const data = {
    limit,
    skip,
    filters
  };

  const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
      .then(response => {
        return {
          size: response.data.size,
          articles: response.data.articles
        }
      });

  return {
    type: actionTypes.GET_PRODUCTS_TO_SHOP,
    payload: request
  }
}