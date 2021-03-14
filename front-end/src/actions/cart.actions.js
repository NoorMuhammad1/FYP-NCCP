import { authConstants } from "./constants";
import axios from "../helpers/axios";

export const addItemToCart = (data) => {
  return (dispatch) => {
    //dispatch({ type: authConstants.CART_RESET });
    dispatch({ type: authConstants.CART_ITEM_ADD, payload: { ...data } });
  };
};

export const removeFromCart = (data) => {
  return (dispatch) => {
    dispatch({ type: authConstants.CART_ITEM_REMOVE, payload: { ...data } });
  };
};

export const increaseQuantity = (data) => {
  return (dispatch) => {
    dispatch({
      type: authConstants.CART_ITEM_QUANTITY_INCREASE,
      payload: { ...data },
    });
  };
};
export const decreaseQuantity = (data) => {
  return (dispatch) => {
    dispatch({
      type: authConstants.CART_ITEM_QUANTITY_DECREASE,
      payload: { ...data },
    });
  };
};
