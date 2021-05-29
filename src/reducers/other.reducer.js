import { authConstants } from "../actions/constants";

const initialState = {
  prices: {
    data: {},
    fetching: false,
    fetched: false,
    message: "",
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  documents: {
    data: [],
    fetching: false,
    fetched: false,
    message: "",
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  shareData: {
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
};

const OtherReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.GET_PRICES_REQUEST:
      state = {
        ...state,
        prices: {
          ...state.prices,
          data: [],
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
    case authConstants.GET_PRICES_SUCCESS:
      state = {
        ...state,
        prices: {
          ...state.prices,
          data: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.GET_PRICES_FAILURE:
      state = {
        ...state,
        prices: {
          ...state.prices,
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

    case authConstants.SET_PRICES_REQUEST:
      state = {
        ...state,
        prices: {
          ...state.prices,
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
    case authConstants.SET_PRICES_SUCCESS:
      state = {
        ...state,
        prices: {
          ...state.prices,
          message: action.payload.message,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.SET_PRICES_FAILURE:
      state = {
        ...state,
        prices: {
          ...state.prices,
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
    case authConstants.GET_DOCUMENTS_REQUEST:
      state = {
        ...state,
        documents: {
          ...state.documents,
          fetching: false,
          fetched: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.GET_DOCUMENTS_SUCCESS:
      state = {
        ...state,
        documents: {
          ...state.documents,
          fetching: true,
          fetched: false,
          data: action.payload.data,
        },
      };
      break;
    case authConstants.GET_DOCUMENTS_FAILURE:
      state = {
        ...state,
        documents: {
          ...state.documents,
          fetching: false,
          fetched: false,
          error: {
            found: true,
            code: action.payload.status,
            message: action.payload.message,
          },
        },
      };
      break;
    case authConstants.UPLOAD_DOCUMENTS_REQUEST:
      state = {
        ...state,
        documents: {
          ...state.documents,
          fetching: false,
          fetched: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.UPLOAD_DOCUMENTS_SUCCESS:
      state = {
        ...state,
        documents: {
          ...state.documents,
          fetching: true,
          fetched: false,
          message: action.payload.message,
        },
      };
      break;
    case authConstants.UPLOAD_DOCUMENTS_FAILURE:
      state = {
        ...state,
        documents: {
          ...state.documents,
          fetching: false,
          fetched: false,
          error: {
            found: true,
            code: action.payload.status,
            message: action.payload.message,
          },
        },
      };
      break;
    case authConstants.SHARE_DATA_DOCUMENTS_REQUEST:
      state = {
        ...state,
        shareData: {
          ...state.shareData,
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
    case authConstants.SHARE_DATA_DOCUMENTS_SUCCESS:
      state = {
        ...state,
        shareData: {
          ...state.shareData,
          fetching: false,
          fetched: true,
          message: action.payload.message,
        },
      };
      break;
    case authConstants.SHARE_DATA_DOCUMENTS_FAILURE:
      // alert("came in failure");
      state = {
        ...state,
        shareData: {
          ...state.shareData,
          fetching: false,
          fetched: false,
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
export default OtherReducer;
