import axios from "../helpers/axios";
import { authConstants } from "./constants";

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
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.GET_PAYMENTS_FAILURE,
          payload: { status: res.status, message: error.data.message },
        });
      } else {
        console.log(error);
      }
    }
  };
};

export const deletePayment = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.PAYMENT_DELETE_REQUEST });

    try {
      const res = await axios.post("/deletePayment", { ...data });
      if (res.status === 200) {
        console.log("payment deleted successfully");
        dispatch({ type: authConstants.PAYMENT_DELETE_SUCCESS });
        dispatch(getPayments());
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.GET_PAYMENTS_FAILURE,
          payload: { status: res.status, message: error.data.message },
        });
      } else {
        console.log(error);
      }
    }
  };
};

export const getPaymentDetails = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.GET_PAYMENT_DETAILS_REQUEST });
      const res = await axios.post("/paymentDetails", { ...data });
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_PAYMENT_DETAILS_SUCCESS,
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
          type: authConstants.GET_PAYMENT_DETAILS_FAILURE,
          payload: { status: res.status, message: error.data.message },
        });
      } else {
        console.log(error);
      }
    }
  };
};
