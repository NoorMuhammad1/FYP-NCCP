import { authConstants } from "../actions/constants";

const initialState = {
  updateMicroorganism: {
    data: {},
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  fetchMicroorganism: {
    data: {},
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  getMicroorganisms: {
    microorganisms: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
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

const catalogue = (state = initialState, action) => {
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
      break;
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
    case authConstants.ADD_MICROORGANISM_RESET: {
      state = {
        ...state,
        addMicroorganism: {
          data: {},
          added: false,
          adding: false,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
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
      break;
    }
    case authConstants.DASHBOARD_CATALOUGE_REQUEST:
      state = {
        ...state,
        getMicroorganisms: {
          ...state.getMicroorganisms,
          microorganisms: [],
          fetched: false,
          fetching: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.DASHBOARD_CATALOGUE_SUCCESS:
      state = {
        ...state,
        getMicroorganisms: {
          ...state.getMicroorganisms,
          microorganisms: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.DASHBOARD_CATALOUGE_FAILURE:
      state = {
        ...state,
        getMicroorganisms: {
          ...state.getMicroorganisms,
          fetching: false,
          fetched: false,
          error: {
            found: true,
            code: action.payload.status_code,
            message: action.payload.message,
          },
        },
      };
      break;
    case authConstants.FETCH_MICROORGANISM_DETAILS_REQUEST:
      state = {
        ...state,
        fetchMicroorganism: {
          ...state.fetchMicroorganism,
          data: {},
          fetched: false,
          fetching: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.FETCH_MICROORGANISM_DETAILS_SUCCESS:
      state = {
        ...state,
        fetchMicroorganism: {
          ...state.fetchMicroorganism,
          data: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.FETCH_MICROORGANISM_DETAILS_FAILURE:
      state = {
        ...state,
        fetchMicroorganism: {
          ...state.fetchMicroorganism,
          fetching: false,
          fetched: false,
          error: {
            found: true,
            code: action.payload.status_code,
            message: action.payload.message,
          },
        },
      };
      break;
    case authConstants.UPDATE_MICROORGANISM_DETAILS_REQUEST:
      state = {
        ...state,
        updateMicroorganism: {
          ...state.updateMicroorganism,
          data: {},
          fetched: false,
          fetching: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.UPDATE_MICROORGANISM_DETAILS_SUCCESS:
      state = {
        ...state,
        updateMicroorganism: {
          ...state.updateMicroorganism,
          data: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.UPDATE_MICROORGANISM_DETAILS_FAILURE:
      state = {
        ...state,
        updateMicroorganism: {
          ...state.updateMicroorganism,
          fetching: false,
          fetched: false,
          error: {
            found: true,
            code: action.payload.status_code,
            message: action.payload.message,
          },
        },
      };
      break;
    default:
      break;
  }
  return state;
};
export default catalogue;
