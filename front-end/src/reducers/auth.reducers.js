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
    message: 0,
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      console.log("payload: ", action.payload);
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      alert("loggin failure");
      state = {
        ...initialState,
      };
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      break;
    case authConstants.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state = {
        ...initialState,
      };
      alert("everything reset");
      break;
    default:
      break;
  }
  return state;
};

export default auth;
