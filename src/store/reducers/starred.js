import * as actionTypes from '../actionTypes';

const initialState = {
    starred: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_STARRED:
      return {
       starred: state.starred.concat( action.payload.coinId )
      };
    case actionTypes.REMOVE_STARRED:
      return {
        starred: state.starred.filter(coinId => {
          return coinId !== action.payload.coinId 
        })
      };
    default:
      return state;
  }
};

export default reducer;