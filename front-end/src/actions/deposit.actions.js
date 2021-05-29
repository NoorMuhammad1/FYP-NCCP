import axios from "../helpers/axios";
import { authConstants } from "./constants";

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
      console.log(error.response);
      // dispatch({
      //   type: authConstants.GET_DEPOSITS_FAILURE,
      //   payload: { status: res.status, message: error.data.message },
      // });
    }
  };
};

const createDeposit = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CREATE_DEPOSIT_REQUEST, payload: data });
    try {
      let res = await axios.post("/createDeposit", { ...data });
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: authConstants.CREATE_DEPOSIT_SUCCESS });
        alert("The deposit has been created successfully");
      }
    } catch (error) {
      dispatch({
        type: authConstants.CREATE_DEPOSIT_FAILURE,
        payload: {
          status_code: error.response.status,
          message: error.response.message,
        },
      });
    }
  };
};

const getDepositDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_DEPOSIT_DETAILS_REQUEST });
    try {
      console.log("making the request to depositdetials");
      const res = await axios.post("/depositdetails", { deposit_id: id });
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_DEPOSIT_DETAILS_SUCCESS,
          payload: { data: res.data },
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: authConstants.GET_ORDER_DETAILS_FAILURE,
        payload: { status: error.status, message: error.response.data.message },
      });
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
      // console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        dispatch({
          type: authConstants.ADMIN_APPROVE_DEPOSIT_SUCCESS,
        });
        dispatch(getDepositDetails(data.deposit_id));
      }
    } catch (error) {
      console.log("error", error.response);
      dispatch({
        type: authConstants.GET_ORDER_DETAILS_FAILURE,
        payload: { status: error.status, message: error.response.data.message },
      });
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
        console.log("sending ", data.deposit_id);
        dispatch(getDepositDetails(data.deposit_id));
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: authConstants.ADMIN_DEPOSIT_REJECT_FAILURE,
        payload: {
          status_code: error.response.status,
          message: error.response.data.message,
        },
      });
    }
  };
};

const submitDepositFile = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SUBMIT_DEPOSIT_FILE_REQUEST });
      let res = await axios.post("/submitDepositFiles", data);
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.SUBMIT_DEPOSIT_FILE_SUCCESS });
        dispatch(getDepositDetails(id));
      }
    } catch (error) {
      console.log(error.response);
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
        dispatch(getDepositDetails(data.deposit_id));
      }
    } catch (error) {
      console.log(error.response);
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
        dispatch(getDepositDetails(data.deposit_id));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

const submitDepositTrackingNumber = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SUBMIT_DEPOSIT_TRACKING_REQUEST });
    let res = await axios.post("/submitDepositTrackingNumber", { ...data });
    if (res.status === 200) {
      console.log(res.data);
      dispatch({ type: authConstants.SUBMIT_DEPOSIT_TRACKING_SUCCESS });
      dispatch(getDepositDetails(data.deposit_id));
    }
    if (res.status === 400) {
      console.log(res.data);
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
        dispatch(getDepositDetails(data.deposit_id));
      }
    } catch (error) {
      console.log(error.response);
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
        dispatch(getDepositDetails(data.deposit_id));
      }
    } catch (error) {
      console.log(error.response);
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
      console.log(error.response);
    }
  };
};

export {
  changeAdminDepositStatus,
  adminDepositReject,
  getDeposits,
  createDeposit,
  getDepositDetails,
  submitDepositFile,
  approveDepositDocument,
  rejectDepositDocument,
  submitDepositTrackingNumber,
  confirmDepositDelivery,
  rejectDepositItems,
  deleteDeposit,
};
