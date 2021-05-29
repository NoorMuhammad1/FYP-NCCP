import { authConstants } from "../actions/constants";

const initialState = {
  deleteLogs: {
    deleting: false,
    deleted: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  logDetails: {
    data: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  getLogs: {
    logs: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  fetching: false,
  fetched: false,
  error: {
    code: 0,
    message: "",
  },
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.GET_LOGS_REQUEST:
      state = {
        ...state,
        getLogs: {
          ...state.getLogs,
          logs: [],
          fetched: false,
          fetching: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.GET_LOGS_SUCCESS:
      state = {
        ...state,
        getLogs: {
          ...state.getLogs,
          logs: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.GET_LOGS_FAILURE:
      state = {
        ...state,
        getLogs: {
          ...state.getLogs,
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

    case authConstants.GET_LOG_DETAILS_REQUEST:
      state = {
        ...state,
        logDetails: {
          ...state.logDetails,
          fetched: false,
          fetching: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };

      break;
    case authConstants.GET_LOG_DETAILS_SUCCESS:
      state = {
        ...state,
        logDetails: {
          ...state.logDetails,
          data: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.GET_LOG_DETAILS_FAILURE:
      state = {
        ...state,
        logDetails: {
          ...state.logDetails,
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
    case authConstants.LOGS_DELETE_REQUEST:
      state = {
        ...state,
        deleteLogs: {
          ...state.deleteLogs,
          deleted: false,
          deleting: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.LOGS_DELETE_SUCCESS:
      state = {
        ...state,
        deleteLogs: {
          ...state.deleteLogs,
          deleted: true,
          deleting: false,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.LOGS_DELETE_FAILURE:
      state = {
        ...state,
        deleteLogs: {
          ...state.deleteLogs,
          deleted: false,
          deleting: false,
          error: {
            found: true,
            code: action.payload.status,
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
export default logReducer;
