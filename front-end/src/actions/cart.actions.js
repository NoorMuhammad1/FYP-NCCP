import auth from "reducers/auth.reducers";
import axios from "../helpers/axios";
import { authConstants } from "./constants";

const addItemToCart = (data) => {
  return (dispatch) => {
    dispatch({ type: authConstants.CART_ITEM_ADD, payload: { ...data } });
  };
};
const removeFromCart = (data) => {
  return (dispatch) => {
    dispatch({ type: authConstants.CART_ITEM_REMOVE, payload: { ...data } });
  };
};
const increaseQuantity = (data) => {
  return (dispatch) => {
    dispatch({
      type: authConstants.CART_ITEM_QUANTITY_INCREASE,
      payload: { ...data },
    });
  };
};
const changeQuantity = (id, qty) => {
  return (dispatch) => {
    dispatch({
      type: authConstants.CART_ITEM_QUANTITY_CHANGE,
      payload: { id, quantity: qty },
    });
  };
};
const decreaseQuantity = (data) => {
  return (dispatch) => {
    dispatch({
      type: authConstants.CART_ITEM_QUANTITY_DECREASE,
      payload: { ...data },
    });
  };
};

const createOrder = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CREATE_ORDER_REQUEST, payload: data });
    try {
      let res = await axios.post("/createOrder", data);
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: authConstants.CREATE_ORDER_SUCCESS });
        alert("The order has been created successfully");
        dispatch({ type: authConstants.CART_RESET });
      }
    } catch (error) {
      dispatch({
        type: authConstants.CREATE_ORDER_FAILURE,
        payload: {
          status_code: error.response.status,
          message: error.response.message,
        },
      });
    }
  };
};

export {
  addItemToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
  createOrder,
};
