import { authConstants } from "../actions/constants";

const initialState = {
  collapsed: true,
};

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.COLLAPSE_SIDEBAR:
      state = {
        ...state,
        collapsed: !state.collapsed,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default sidebar;
