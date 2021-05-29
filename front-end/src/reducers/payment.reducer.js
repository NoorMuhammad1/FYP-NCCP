import { authConstants } from "../actions/constants";

const initialState = {
  paymentToken: "",
  deletePayment: {
    deleting: false,
    deleted: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  getPayments: {
    payments: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  items: [],
  response: {
    message: "",
    status: 0,
    found: false,
  },
  error: {
    message: "",
    status: 0,
    found: false,
  },
};

const payment = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.PAYMENT_REQUEST:
      state = {
        ...initialState,
        paymentToken: action.payload.token,
        items: action.payload.products,
      };
      break;
    case authConstants.PAYMENT_SUCCESSFULL:
      state = {
        ...state,
        response: {
          message: action.payload.message,
          status: action.payload.status,
          found: true,
        },
      };
      break;
    case authConstants.PAYMENT_FAILURE:
      state = {
        ...state,
        error: {
          message: action.payload.message,
          status: action.payload.status,
          found: true,
        },
      };
      break;

    case authConstants.GET_PAYMENTS_REQUEST:
      state = {
        ...state,
        getPayments: {
          ...state.getPayments,
          payments: [],
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
    case authConstants.GET_PAYMENTS_SUCCESS:
      state = {
        ...state,
        getPayments: {
          ...state.getPayments,
          payments: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.GET_PAYMENTS_FAILURE:
      state = {
        ...state,
        getPayments: {
          ...state.getPayments,
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
    case authConstants.PAYMENT_DELETE_REQUEST:
      state = {
        ...state,
        deletePayment: {
          ...state.deletePayment,
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
    case authConstants.PAYMENT_DELETE_SUCCESS:
      state = {
        ...state,
        deletePayment: {
          ...state.deletePayment,
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
    case authConstants.PAYMENT_DELETE_FAILURE:
      state = {
        ...state,
        deletePayment: {
          ...state.deletePayment,
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
      break;
  }
  return state;
};

export default payment;
