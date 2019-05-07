import * as actionTypes from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_SITE_DATA:
      return {...state, siteData: action.payload};
    case actionTypes.UPDATE_SITE_DATA:
      return {...state,siteData: action.payload.siteInfo};
    default:
      return state;
  }
}