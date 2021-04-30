import { authConstants } from './constants';

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
               type   : authConstants.CART_ITEM_QUANTITY_INCREASE,
               payload: { ...data },
             });
  };
};
const decreaseQuantity = (data) => {
  return (dispatch) => {
    dispatch({
               type   : authConstants.CART_ITEM_QUANTITY_DECREASE,
               payload: { ...data },
             });
  };
};

export {
  addItemToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
};
