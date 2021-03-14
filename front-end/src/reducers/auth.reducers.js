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

export default (state = initialState, action) => {
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
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...initialState,
      };
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    case authConstants.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state = {
        ...initialState,
      };
      // alert("everything reset");
      break;
  }
  return state;
};
