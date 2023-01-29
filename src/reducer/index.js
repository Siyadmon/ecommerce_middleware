import { combineReducers } from 'redux';

let initialState = {
  data: [],
  editData: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'GET_DATA_BY_ID':
      return {
        ...state,
        editData: action.payload,
      };
  }
  return state;
};

export default combineReducers({ productsReducer });
