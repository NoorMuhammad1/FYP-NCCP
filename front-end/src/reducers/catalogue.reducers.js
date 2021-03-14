import { authConstants } from "../actions/constants";

const initialState = {
  catalogueData: [],
  fetching: false,
  fetched: false,
  addMicroorganism: {
    adding: false,
    added: false,
    data: {},
    error: {
      code: 0,
      message: "",
    },
  },
  delete: {
    deleting: false,
    deleted: false,
    data: {},
    error: {
      code: 0,
      message: "",
    },
  },
  error: {
    code: 0,
    message: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.CATALOGUE_INFO_REQUEST:
      state = {
        ...state,
        fetching: true,
        fetched: false,
      };
      break;
    case authConstants.CATALOGUE_INFO_SUCCESS:
      state = {
        ...state,
        catalogueData: action.payload.data,
        fetching: false,
        fetched: true,
      };
      break;
    case authConstants.CATALOGUE_INFO_FAILURE:
      state = {
        ...state,
        fetching: false,
        fetched: false,
        error: {
          code: action.payload.status_code,
          message: action.payload.message,
        },
      };
    case authConstants.ADD_MICROORGANISM_REQUEST: {
      state = {
        ...state,
        addMicroorganism: {
          ...state.addMicroorganism,
          adding: true,
          added: false,
          data: action.payload.data,
        },
      };
      break;
    }
    case authConstants.ADD_MICROORGANISM_SUCCESS: {
      state = {
        ...state,
        addMicroorganism: {
          ...state.addMicroorganism,
          added: true,
          adding: false,
        },
      };
      break;
    }
    case authConstants.ADD_MICROORGANISM_FAILURE: {
      state = {
        ...state,
        addMicroorganism: {
          ...state.addMicroorganism,
          added: false,
          adding: false,
          error: {
            code: action.payload.code,
            message: action.payload.message,
          },
        },
      };
      break;
    }
    case authConstants.RESET_ADD_MICROORGANISM_STATE: {
      state = {
        ...state,
        addMicroorganism: {
          ...initialState.addMicroorganism,
        },
      };
      break;
    }
    case authConstants.CATALOGUE_DELETE_ITEM_REQUEST: {
      state = {
        ...state,
        delete: {
          ...state.delete,
          data: action.payload.data,
          deleting: true,
          deleted: false,
        },
      };
      break;
    }
    case authConstants.CATALOGUE_DELETE_ITEM_SUCCESS: {
      state = {
        ...state,
        delete: {
          ...state.delete,
          deleting: false,
          deleted: true,
        },
      };
      break;
    }
    case authConstants.CATALOGUE_DELETE_ITEM_FAILURE: {
      state = {
        ...state,
        delete: {
          ...state.delete,
          deleted: false,
          deleting: false,
          error: {
            code: action.payload.code,
            message: action.payload.message,
          },
        },
      };
    }
  }
  return state;
};
