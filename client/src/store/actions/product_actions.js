import axios from 'axios';

import { PRODUCT_SERVER } from "../../utils/misc";
import * as actionTypes from './types';

///////////////////////////////////
////////   PRODUCT   ///////////
///////////////////////////////////

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

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
  const data = {
    limit,
    skip,
    filters
  };

  const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
      .then(response => {
        let newState = [...previousState,...response.data.articles];
        return {
          size: response.data.size,
          articles: newState
        }
      });

  return {
    type: actionTypes.GET_PRODUCTS_TO_SHOP,
    payload: request
  }
}

export function addProduct(dataToSubmit){
  const request = axios.post(`${PRODUCT_SERVER}/article`,dataToSubmit)
      .then(response => response.data);
  return {
    type: actionTypes.ADD_PRODUCT,
    payload: request
  }
}

export function clearProduct() {
  return {
    type: actionTypes.CLEAR_PRODUCT,
    payload: ''
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

export function addBrand(dataToSubmit, existingBrands) {
  const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
      .then(response => {
        let brands = [
            ...existingBrands,
            response.data.brand
        ];
        return {
          success: response.data.success,
          brands
        }
      });

  return {
    type: actionTypes.ADD_BRAND,
    payload: request
  }
}

export function addWood(dataToSubmit, existingWoods) {
  const request = axios.post(`${PRODUCT_SERVER}/wood`,dataToSubmit)
      .then(response => {
        let woods = [
          ...existingWoods,
          response.data.wood
        ];
        return {
          success: response.data.success,
          woods
        }
      });

  return {
    type: actionTypes.ADD_WOOD,
    payload: request
  }
}