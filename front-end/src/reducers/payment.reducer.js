import { authConstants } from "../actions/constants";

const initialState = {
  paymentToken: "",
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

export default (state = initialState, action) => {
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
  }
  return state;
};
