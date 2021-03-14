import { authConstants } from "../actions/constants";

const initialState = {
  data: {},
  updating: false,
  updated: false,
  updateError: false,
  code: 0,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.UPDATING_USER_REQUEST:
      state = {
        ...state,
        data: action.payload.data,
        updating: true,
      };
      break;
    case authConstants.UPDATING_USER_SUCCESS:
      state = {
        ...state,
        updating: false,
        updated: true,
        code: action.payload.status_code,
        message: action.payload.message,
      };
      break;
    case authConstants.UPDATING_USER_FAILURE:
      state = {
        ...state,
        updating: false,
        updated: false,
        updateError: true,
        code: action.payload.status_code,
        message: action.payload.message,
      };
  }
  return state;
};
