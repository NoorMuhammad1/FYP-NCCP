import { authConstants } from "../actions/constants";

const initialState = {
  fetchReport: {
    data: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.FETCH_REPORT_REQUEST:
      state = {
        ...state,
        fetchReport: {
          ...state.fetchReport,
          fetching: true,
          fetched: false,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.FETCH_REPORT_SUCCESS:
      state = {
        ...state,
        fetchReport: {
          ...state.fetchReport,
          data: action.payload.data,
          fetching: false,
          fetched: true,
        },
      };
      break;
    case authConstants.FETCH_REPORT_FAILURE:
      state = {
        ...state,
        fetchReport: {
          ...state.fetchReport,
          fetching: false,
          fetched: false,
          error: {
            found: true,
            code: action.payload.status_code,
            message: action.payload.message,
          },
        },
      };
      break;
    default:
      state = initialState;
  }
  return state;
};
export default reportReducer;
