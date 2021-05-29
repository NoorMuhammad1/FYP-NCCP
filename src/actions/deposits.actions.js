import { authConstants } from "./constants";
import axios from "../helpers/axios";

const getDeposits = () => {
  return async (dispatch) => {
    // alert("res came baby");
    dispatch({ type: authConstants.GET_DEPOSITS_REQUEST });
    try {
      const res = await axios.get("/depositlist");
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_DEPOSITS_SUCCESS,
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
          type: authConstants.GET_DEPOSITS_FAILURE,
          payload: { status: res.status, message: error.data.message },
        });
      } else {
        console.log(error);
      }
    }
  };
};

const deleteDeposit = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.DEPOSIT_DELETE_REQUEST });

    try {
      const res = await axios.post("/deleteDeposit", { ...data });
      if (res.status === 200) {
        console.log("deposit deleted successfully");
        dispatch({ type: authConstants.DEPOSIT_DELETE_SUCCESS });
        dispatch(getDeposits());
      }
    } catch (error) {
      if (error.response) {
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

const getDepositDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_DEPOSIT_DETAILS_REQUEST });
    try {
      console.log("making the request to depositdetials");
      const res = await axios.post("/depositdetails", { deposit_id: id });
      if (res.status === 200) {
        // console.log(res);
        dispatch({
          type: authConstants.GET_DEPOSIT_DETAILS_SUCCESS,
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
          type: authConstants.GET_ORDER_DETAILS_FAILURE,
          payload: {
            status: error.status,
            message: error.response.data.message,
          },
        });
      } else {
        console.log(error);
      }
      // if (error.response.status === 405) {
      //   dispatch({
      //     type: authConstants.LOGOUT,
      //   });
      // }
    }
  };
};

const changeAdminDepositStatus = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.ADMIN_APPROVE_DEPOSIT_REQUEST });
      let res = await axios.post("/changeDepositStatus", { ...data });
      if (res.status === 200) {
        dispatch({
          type: authConstants.ADMIN_APPROVE_DEPOSIT_SUCCESS,
        });
        console.log(res.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch(getDepositDetails(data.deposit_id));
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.GET_ORDER_DETAILS_FAILURE,
          payload: {
            status: error.status,
            message: error.response.data.message,
          },
        });
      } else {
        console.log(error);
      }
    }
  };
};

const adminDepositReject = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.ADMIN_DEPOSIT_REJECT_REQUEST });
      let res = await axios.post("/rejectDeposit", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.ADMIN_DEPOSIT_REJECT_SUCCESS });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch(getDepositDetails(data.deposit_id));
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.ADMIN_DEPOSIT_REJECT_FAILURE,
          payload: {
            status_code: error.response.status,
            message: error.response.data.message,
          },
        });
      } else {
        console.log(error);
      }
    }
  };
};

const approveDepositDocument = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.APPROVE_DEPOSIT_DOCUMENT_REQUEST });
      let res = await axios.post("/approveDepositDocument", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.APPROVE_DEPOSIT_DOCUMENT_SUCCESS });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch(getDepositDetails(data.deposit_id));
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
const rejectDepositDocument = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.REJECT_DEPOSIT_DOCUMENT_REQUEST });
      let res = await axios.post("/rejectDepositDocument", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.REJECT_DEPOSIT_DOCUMENT_SUCCESS });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch(getDepositDetails(data.deposit_id));
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

const submitDepositTrackingNumber = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SUBMIT_DEPOSIT_TRACKING_REQUEST });
      let res = await axios.post("/submitDepositTrackingNumber", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.SUBMIT_DEPOSIT_TRACKING_SUCCESS });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch(getDepositDetails(data.deposit_id));
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

const confirmDepositDelivery = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.CONFIRM_DEPOSIT_DELIVERY_REQUEST });
      let res = await axios.post("/changeDepositStatus", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.CONFIRM_DEPOSIT_DELIVERY_SUCCESS });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch(getDepositDetails(data.deposit_id));
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

const rejectDepositItems = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.REJECT_DEPOSIT_ITEMS_REQUEST });
      let res = await axios.post("/rejectDepositItems", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.REJECT_DEPOSIT_ITEMS_SUCCESS });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch(getDepositDetails(data.deposit_id));
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

export {
  changeAdminDepositStatus,
  adminDepositReject,
  getDeposits,
  getDepositDetails,
  approveDepositDocument,
  rejectDepositDocument,
  submitDepositTrackingNumber,
  confirmDepositDelivery,
  rejectDepositItems,
  deleteDeposit,
};
