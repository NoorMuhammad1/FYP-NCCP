import { authConstants } from "../actions/constants";

const initialState = {
  token: null,
  user: {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
  },
  authenticate: false,
  authenticating: false,
  error: {
    found: false,
    status_code: 0,
    message: "",
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        error: {
          ...initialState.error,
        },
      };
      break;
    case authConstants.LOGIN_FAILURE:
      // alert("loggin failure");
      state = {
        ...state,
        authenticate: false,
        authenticating: false,
        error: {
          found: true,
          status_code: action.payload.status_code,
          message: action.payload.message,
        },
      };
      break;
    case authConstants.LOGOUT:
      state = initialState;
    default:
      state = state;
      break;
  }
  return state;
};

export default authReducer;
