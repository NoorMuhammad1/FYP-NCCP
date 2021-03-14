import { authConstants } from "../actions/constants";

const initialState = {
  users: {
    userList: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      status_code: 0,
      message: "",
    },
  },
  add_user: {
    data: {},
    adding: false,
    added: false,
    error: {
      found: false,
      status_code: 0,
      message: "",
    },
  },
  delete_user: {},
  user_data: {},
  // users: [],
  // user: {
  //   data: {},

  //   deleting: false,
  //   deleted: false,
  // },
  // add_user: {
  //   data: {},
  //   error: false,
  //   message: "",
  //   adding: false,
  //   added: false,
  // },
  // fetching: false,
  // fetched: false,
  // error: {
  //   found:false,
  //   status_code: 0,
  //   message: "",
  // },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.USERS_FETCH_REQUEST:
      state = {
        ...state,
        users: {
          ...state.users,
          fetching: true,
        },
      };
      break;
    case authConstants.USERS_FETCH_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          fetched: true,
          fetching: false,
          userList: action.payload.users,
        },
      };
      break;
    case authConstants.USERS_FETCH_FAILURE:
      state = {
        ...state,
        users: {
          ...state.users,
          fetching: false,
          error: {
            found: true,
            status_code: action.payload.status_code,
            message: action.payload.message,
          },
        },
      };
      break;
    case authConstants.USER_DATA_REQUEST:
      state = {
        ...state,
        fetching: true,
      };
      break;
    case authConstants.USER_DATA_SUCCESS:
      state = {
        ...state,
        fetched: true,
        fetching: false,
        user: action.payload.user,
      };
      break;
    case authConstants.USER_DATA_FAILURE:
      state = {
        ...initialState,
      };
      break;
    case authConstants.USER_DELETE_REQUEST:
      state = {
        ...state,
        user: {
          deleting: true,
        },
      };
      break;
    case authConstants.USER_DELETE_SUCCESS:
      state = {
        ...state,
        user: {
          deleting: false,
          deleted: true,
        },
      };
      break;
    case authConstants.USER_ADD_REQUEST:
      state = {
        ...state,
        add_user: {
          ...initialState.add_user,
          data: action.payload.data,
          adding: true,
          added: false,
        },
      };
      break;
    case authConstants.USER_ADD_SUCCESS:
      state = {
        ...state,
        add_user: {
          ...state.add_user,
          adding: false,
          added: true,
          error: {
            ...state.add_user.error,
            found: false,
          },
        },
      };
      break;
    case authConstants.USER_ADD_FAILURE:
      state = {
        ...state,
        add_user: {
          ...state.add_user,
          added: false,
          adding: false,
          error: {
            ...state.add_user.error,
            found: true,
            message: action.payload.message,
            status_code: action.payload.status,
          },
        },
      };
  }
  return state;
};
