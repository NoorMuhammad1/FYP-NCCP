import { authConstants } from "../actions/constants";

const initialState = {
  messages: [],
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.TOAST_ADD:
      state = {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
      break;
    case authConstants.TOAST_REMOVE:
      state = {
        ...state,
        messages: action.payload.messages,
      };
      break;
    default:
      state = state;
      break;
  }
  return state;
};

export default toastReducer;
