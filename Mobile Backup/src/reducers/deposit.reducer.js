import { authConstants } from "../actions/constants";

const initialState = {
  deleteDeposit: {
    deleting: false,
    deleted: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  depositDetails: {
    data: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  getDeposits: {
    deposits: [],
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

const depositReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.GET_DEPOSITS_REQUEST:
      state = {
        ...state,
        getDeposits: {
          ...state.getDeposits,
          deposits: [],
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
    case authConstants.GET_DEPOSITS_SUCCESS:
      state = {
        ...state,
        getDeposits: {
          ...state.getDeposits,
          deposits: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.GET_DEPOSITS_FAILURE:
      state = {
        ...state,
        getDeposits: {
          ...state.getDeposits,
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
    case authConstants.CREATE_DEPOSIT_REQUEST:
      state = {
        ...state,
        fetched: false,
        fetching: true,
        error: {
          found: false,
          code: 0,
          message: "",
        },
      };
      break;
    case authConstants.CREATE_DEPOSIT_SUCCESS:
      state = {
        ...state,
        fetched: true,
        fetching: false,
      };
      break;
    case authConstants.CREATE_DEPOSIT_FAILURE:
      state = {
        ...state,
        fetching: false,
        fetched: false,
        error: {
          found: true,
          code: action.payload.status_code,
          message: action.payload.message,
        },
      };
      break;
    case authConstants.GET_DEPOSIT_DETAILS_REQUEST:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.GET_DEPOSIT_DETAILS_SUCCESS:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
          data: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.GET_DEPOSIT_DETAILS_FAILURE:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.ADMIN_APPROVE_DEPOSIT_REQUEST:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.ADMIN_APPROVE_DEPOSIT_SUCCESS:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.ADMIN_APPROVE_DEPOSIT_REQUEST:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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

    case authConstants.APPROVE_DEPOSIT_DOCUMENT_REQUEST:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.APPROVE_DEPOSIT_DOCUMENT_SUCCESS:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.APPROVE_DEPOSIT_DOCUMENT_FAILURE:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.REJECT_DEPOSIT_DOCUMENT_REQUEST:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.REJECT_DEPOSIT_DOCUMENT_SUCCESS:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.REJECT_DEPOSIT_DOCUMENT_FAILURE:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.SUBMIT_DEPOSIT_TRACKING_REQUEST:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.SUBMIT_DEPOSIT_TRACKING_SUCCESS:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.SUBMIT_DEPOSIT_TRACKING_FAILURE:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.SUBMIT_DEPOSIT_FILE_REQUEST:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.SUBMIT_DEPOSIT_FILE_SUCCESS:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.SUBMIT_DEPOSIT_FILE_FAILURE:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.CONFIRM_DEPOSIT_DELIVERY_REQUEST:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.CONFIRM_DEPOSIT_DELIVERY_SUCCESS:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.CONFIRM_DEPOSIT_DELIVERY_FAILURE:
      state = {
        ...state,
        depositDetails: {
          ...state.depositDetails,
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
    case authConstants.DEPOSIT_DELETE_REQUEST:
      state = {
        ...state,
        deleteDeposit: {
          ...state.deleteDeposit,
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
    case authConstants.DEPOSIT_DELETE_SUCCESS:
      state = {
        ...state,
        deleteDeposit: {
          ...state.deleteDeposit,
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
    case authConstants.DEPOSIT_DELETE_FAILURE:
      state = {
        ...state,
        deleteDeposit: {
          ...state.deleteDeposit,
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
export default depositReducer;
