import { authConstants } from "./constants";
import axios from "../helpers/axios";

const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_ORDERS_REQUEST });
    try {
      const res = await axios.get("/orderlist");
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_ORDERS_SUCCESS,
          payload: { data: res.data },
        });
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.GET_ORDERS_FAILURE,
          payload: { status: res.status, message: error.data.message },
        });
      } else {
        console.log(error);
      }
    }
  };
};

const deleteOrder = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.ORDER_DELETE_REQUEST });

    try {
      const res = await axios.post("/deleteOrder", { ...data });
      if (res.status === 200) {
        console.log("orders deleted successfully");
        dispatch({ type: authConstants.ORDER_DELETE_SUCCESS });
        dispatch(getOrders());
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
      } else {
        console.log(error);
      }
    }
  };
};

export { getOrders, deleteOrder };
