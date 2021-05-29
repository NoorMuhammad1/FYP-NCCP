import axios from "../helpers/axios.js";
import urls from "../server_urls.js";
import { authConstants } from "./constants";
import { getDepositDetails } from "./deposit.actions.js";
import { getOrderDetails } from "./order.actions.js";

export const confirmPayment = (data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.PAYMENT_REQUEST,
      payload: { token: data.token, items: data.products },
    });

    try {
      let url = "";
      if (data.order_id) url = "/orderPayment";
      if (data.deposit_id) url = "/depositPayment";
      const res = await axios.post(url, { ...data });
      console.log("confirm payment response: ", res);
      if (res.status === 200) {
        dispatch({
          type: authConstants.PAYMENT_SUCCESSFULL,
          payload: {
            message: res.message,
            status: res.status,
          },
        });
        if (data.order_id) {
          dispatch(getOrderDetails(data.order_id));
        }
        if (data.deposit_id) {
          dispatch(getDepositDetails(data.deposit_id));
        }
      }
    } catch (error) {
      console.log("confirm payment error", error.response);
      if (error.response && error.response.status === 400) {
        dispatch({
          type: authConstants.PAYMENT_FAILURE,
          payload: {
            message: error.response.message,
            status: error.response.status,
          },
        });
      }
    }
  };
};

export const getPayments = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_PAYMENTS_REQUEST });
    try {
      const res = await axios.get("/paymentlist");
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_PAYMENTS_SUCCESS,
          payload: { data: res.data },
        });
      }
    } catch (error) {
      console.log(error.response);
      // dispatch({
      //   type: authConstants.GET_PAYMENTS_FAILURE,
      //   payload: { status: res.status, message: error.data.message },
      // });
    }
  };
};

export const deletePayment = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.PAYMENT_DELETE_REQUEST });

    try {
      const res = await axios.post("/deletePayment", { ...data });
      if (res.status === 200) {
        console.log("users deleted successfully");
        dispatch({ type: authConstants.PAYMENT_DELETE_SUCCESS });
        dispatch(getPayments());
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
