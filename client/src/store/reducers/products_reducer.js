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
    default:
      return state;
  }
}