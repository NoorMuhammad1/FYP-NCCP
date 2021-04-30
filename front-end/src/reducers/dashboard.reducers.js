import { authConstants } from '../actions/constants';

const initialState = {
  options : [],
  data    : {},
  fetching: false,
  fetched : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.DASHBOARD_OPTIONS_UPDATE:
      state = {
        ...state,
        options: [
          ...(!state.options.includes(action.payload.option)
            ? [...state.options, action.payload.option]
            : [...state.options]),
        ],
      };
      break;
    case authConstants.DASHBOARD_DATA_REQUEST:
      state = {
        ...state,
        fetching: true,
      };
      break;
    case authConstants.DASHBOARD_DATA_SUCCESS:
      state = {
        ...state,
        data    : action.payload.data,
        fetching: false,
        fetched : true,
      };
      break;
    case authConstants.DASHBOARD_DATA_FAILURE:
      state = initialState;
      break;

    case authConstants.UPDATE_DASHBOARD_OPTIONS:
      state = {
        ...state,
        options: action.payload.options,
        fetched: true,
      };
  }
  return state;
};
