import { authConstants } from '../actions/constants';

const initialState = {
  details : {},
  fetching: false,
  fetched : false,
  error   : {
    code   : 0,
    message: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.CATALOGUE_ITEM_REQUEST:
      state = {
        ...state,
        fetching: true,
      };
      break;
    case authConstants.CATALOGUE_ITEM_SUCCESS:
      state = {
        ...state,
        details : action.payload.data,
        fetched : true,
        fetching: false,
      };
      console.log('Successfully updated the state');
      break;
    case authConstants.CATALOGUE_ITEM_FAILURE:
      state = {
        ...state,
        fetched : false,
        fetching: false,
        error   : {
          code   : action.payload.status_code,
          message: action.payload.message,
        },
      };
      console.log('State updated for error recieved');
      break;
    default:
      state = initialState;
  }
  return state;
};
