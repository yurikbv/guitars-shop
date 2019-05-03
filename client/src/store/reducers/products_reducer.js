import * as actionTypes from '../actions/types';

export default function (state = {},action) {

  switch (action.type) {
    case actionTypes.GET_PRODUCTS_BY_SELL:
      return {
        ...state,
        bySell: action.payload
      };
    case actionTypes.GET_PRODUCTS_BY_ARRIVAL:
      return {
        ...state,
        byArrival: action.payload
      };
    case actionTypes.GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop:action.payload.articles,
        toShopSize: action.payload.size
      };
    case actionTypes.GET_BRANDS:
      return {
        ...state,
        brands: action.payload
      };
    case actionTypes.GET_WOODS:
      return {
        ...state,
        woods: action.payload
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        addProduct: action.payload
      };
    case actionTypes.CLEAR_PRODUCT:
      return {
        ...state,
        addProduct: action.payload
      };
    case actionTypes.ADD_BRAND:
      return {
        ...state,
        addBrand: action.payload.success,
        brands: action.payload.brands
      };
    case actionTypes.ADD_WOOD:
      return {
        ...state,
        addWood: action.payload.success,
        woods: action.payload.woods
      };
    default:
      return state;
  }
}