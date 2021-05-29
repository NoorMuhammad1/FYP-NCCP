import { authConstants } from "../actions/constants";
import auth from "./auth.reducers";

const initialState = {
  deleteOrder: {
    deleting: false,
    deleted: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  create_order: {
    items: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  confirm_order_delivery: {
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  submit_order_files: {
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  admin_order_reject: {
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  approve_order_document: {
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  reject_order_document: {
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  submit_tracking_number: {
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  change_admin_order_status: {
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  getOrders: {
    orders: [],
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  getOrderDetails: {
    order: {},
    fetching: false,
    fetched: false,
    error: {
      found: false,
      code: 0,
      message: "",
    },
  },
  fetching: false,
  fetched: false,
  error: {
    code: 0,
    message: "",
  },
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.GET_ORDERS_REQUEST:
      state = {
        ...state,
        getOrders: {
          ...state.getOrders,
          orders: [],
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
    case authConstants.GET_ORDERS_SUCCESS:
      state = {
        ...state,
        getOrders: {
          ...state.getOrders,
          orders: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.GET_ORDERS_FAILURE:
      state = {
        ...state,
        getOrders: {
          ...state.getOrders,
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
    case authConstants.GET_ORDER_DETAILS_REQUEST:
      state = {
        ...state,
        getOrderDetails: {
          ...state.getOrderDetails,
          order: [],
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
    case authConstants.GET_ORDER_DETAILS_SUCCESS:
      state = {
        ...state,
        getOrderDetails: {
          ...state.getOrderDetails,
          order: action.payload.data,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.GET_ORDER_DETAILS_FAILURE:
      state = {
        ...state,
        getOrderDetails: {
          ...state.getOrderDetails,
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
    case authConstants.CHANGE_ADMIN_ORDER_STATUS_REQUEST:
      state = {
        ...state,
        change_admin_order_status: {
          ...state.change_admin_order_status,
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
    case authConstants.CHANGE_ADMIN_ORDER_STATUS_SUCCESS:
      state = {
        ...state,
        change_admin_order_status: {
          ...state.change_admin_order_status,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.CHANGE_ADMIN_ORDER_STATUS_FAILURE:
      state = {
        ...state,
        change_admin_order_status: {
          ...state.change_admin_order_status,
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
    case authConstants.CHANGE_ADMIN_ORDER_STATUS_REQUEST:
      state = {
        ...state,
        change_admin_order_status: {
          ...state.change_admin_order_status,
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
    case authConstants.CHANGE_ADMIN_ORDER_STATUS_SUCCESS:
      state = {
        ...state,
        change_admin_order_status: {
          ...state.change_admin_order_status,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.CHANGE_ADMIN_ORDER_STATUS_FAILURE:
      state = {
        ...state,
        change_admin_order_status: {
          ...state.change_admin_order_status,
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
    case authConstants.APPROVE_ORDER_DOCUMENT_REQUEST:
      state = {
        ...state,
        approve_order_document: {
          ...state.approve_order_document,
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
    case authConstants.APPROVE_ORDER_DOCUMENT_SUCCESS:
      state = {
        ...state,
        approve_order_document: {
          ...state.approve_order_document,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.APPROVE_ORDER_DOCUMENT_FAILURE:
      state = {
        ...state,
        approve_order_document: {
          ...state.approve_order_document,
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
    case authConstants.REJECT_ORDER_DOCUMENT_REQUEST:
      state = {
        ...state,
        reject_order_document: {
          ...state.reject_order_document,
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
    case authConstants.REJECT_ORDER_DOCUMENT_SUCCESS:
      state = {
        ...state,
        reject_order_document: {
          ...state.reject_order_document,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.REJECT_ORDER_DOCUMENT_FAILURE:
      state = {
        ...state,
        reject_order_document: {
          ...state.reject_order_document,
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
    case authConstants.SUBMIT_ORDER_TRACKING_REQUEST:
      state = {
        ...state,
        submit_tracking_number: {
          ...state.submit_tracking_number,
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
    case authConstants.SUBMIT_ORDER_TRACKING_SUCCESS:
      state = {
        ...state,
        submit_tracking_number: {
          ...state.submit_tracking_number,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.SUBMIT_ORDER_TRACKING_FAILURE:
      state = {
        ...state,
        submit_tracking_number: {
          ...state.submit_tracking_number,
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
    case authConstants.SUBMIT_ORDER_FILE_REQUEST:
      state = {
        ...state,
        submit_order_files: {
          ...state.submit_order_files,
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
    case authConstants.SUBMIT_ORDER_FILE_SUCCESS:
      state = {
        ...state,
        submit_order_files: {
          ...state.submit_order_files,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.SUBMIT_ORDER_FILE_FAILURE:
      state = {
        ...state,
        submit_order_files: {
          ...state.submit_order_files,
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
    case authConstants.CONFIRM_ORDER_DELIVERY_REQUEST:
      state = {
        ...state,
        confirm_order_delivery: {
          ...state.confirm_order_delivery,
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
    case authConstants.CONFIRM_ORDER_DELIVERY_SUCCESS:
      state = {
        ...state,
        confirm_order_delivery: {
          ...state.confirm_order_delivery,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.CONFIRM_ORDER_DELIVERY_FAILURE:
      state = {
        ...state,
        confirm_order_delivery: {
          ...state.confirm_order_delivery,
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
    case authConstants.CREATE_ORDER_REQUEST:
      state = {
        ...state,
        create_order: {
          ...state.create_order,
          items: action.payload.data,
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
    case authConstants.CREATE_ORDER_SUCCESS:
      state = {
        ...state,
        create_order: {
          ...state.create_order,
          fetched: true,
          fetching: false,
        },
      };
      break;
    case authConstants.CREATE_ORDER_FAILURE:
      state = {
        ...state,
        create_order: {
          ...state.create_order,
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
    case authConstants.ORDER_DELETE_REQUEST:
      state = {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          deleted: false,
          deleting: true,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.ORDER_DELETE_SUCCESS:
      state = {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          deleted: true,
          deleting: false,
          error: {
            found: false,
            code: 0,
            message: "",
          },
        },
      };
      break;
    case authConstants.ORDER_DELETE_FAILURE:
      state = {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          deleted: false,
          deleting: false,
          error: {
            found: true,
            code: action.payload.status,
            message: action.payload.message,
          },
        },
      };
      break;
    default:
      state = initialState;
  }
  return state;
};
export default orderReducer;
