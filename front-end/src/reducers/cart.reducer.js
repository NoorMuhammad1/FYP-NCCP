import { authConstants } from "../actions/constants";

const initialState = {
  cartData: [],
  size: 0,
  submitting: false,
  submitted: false,
  error: {
    code: 0,
    message: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.CART_ITEM_ADD:
      let item_exists = state.cartData.find(
        (el) => el.id === action.payload.id
      );
      if (item_exists) {
        state = {
          ...state,
          cartData: state.cartData.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                qty: item.qty + 1,
              };
            }
            return item;
          }),
        };
      } else {
        state = {
          ...state,
          cartData: [
            ...state.cartData,
            {
              ...action.payload,
              qty: 1,
            },
          ],
          size: state.size + 1,
        };
      }
      break;
    case authConstants.CART_ITEM_REMOVE:
      state = {
        ...state,
        cartData: state.cartData.filter((item) => {
          return item.id !== action.payload.id;
        }),
        size: state.size - 1,
      };
      break;
    case authConstants.CART_ITEM_QUANTITY_INCREASE:
      state = {
        ...state,
        cartData: state.cartData.map((item) => {
          console.log(action.payload.id);
          if (item.id === action.payload.id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }
          return item;
        }),
      };
      break;
    case authConstants.CART_ITEM_QUANTITY_DECREASE:
      state = {
        ...state,
        cartData: state.cartData.map((item) => {
          if (item.id === action.payload.id && item.qty > 1) {
            return {
              ...item,
              qty: item.qty - 1,
            };
          }
          return item;
        }),
      };
      break;

    case authConstants.CART_SUBMIT_REQUEST:
      state = {
        ...state,
        submitting: true,
        submitted: false,
      };
      break;
    case authConstants.CART_SUBMIT_SUCCESS:
      state = {
        ...state,
        submitted: true,
        submitting: false,
        size: 0,
      };
      break;
    case authConstants.CART_SUBMIT_FAILURE:
      state = {
        ...state,
        submitting: false,
        submitted: true,
        error: {
          code: action.payload.code,
          message: action.payload.message,
        },
      };
      break;
    case authConstants.CART_RESET:
      state = initialState;
      break;
    default:
      return state;
  }
  return state;
};
