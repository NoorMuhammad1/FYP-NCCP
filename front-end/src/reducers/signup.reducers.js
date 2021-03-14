import { authConstants } from "../actions/constants";
const initialState = {
  // userData: {
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   role: "",
  //   type: "Student",
  //   affiliation: "",
  //   password: "",
  // },
  // data: {},
  registering: false,
  registered: false,
  error: {
    found: false,
    code: 0,
    message: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.SIGNUP_REQUEST:
      state = {
        ...state,
        // userData: action.payload.data,
        registering: true,
        registered: false,
      };
      break;
    case authConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        registering: false,
        registered: true,
      };
      break;
    case authConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        registering: false,
        registered: false,
        error: {
          found: true,
          code: action.payload.status_code,
          message: action.payload.message,
        },
      };
      break;

    case authConstants.SIGNUP_STORE_RESET:
      state = {
        ...initialState,
      };
      break;

    default:
      break;
  }
  return state;
};
