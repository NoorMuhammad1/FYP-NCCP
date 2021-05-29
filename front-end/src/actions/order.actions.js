import axios from "../helpers/axios";
import { authConstants } from "./constants";

const getOrders = () => {
  return async (dispatch) => {
    // alert("res came baby");
    dispatch({ type: authConstants.GET_ORDERS_REQUEST });
    try {
      const res = await axios.get("/orderlist");
      if (res.status === 200) {
        console.log(res.data);
        dispatch({
          type: authConstants.GET_ORDERS_SUCCESS,
          payload: { data: res.data },
        });
      }
    } catch (error) {
      console.log(error.response);
      // dispatch({
      //   type: authConstants.GET_ORDERS_FAILURE,
      //   payload: { status: res.status, message: error.data.message },
      // });
    }
  };
};
const getOrderDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_ORDER_DETAILS_REQUEST });
    try {
      const res = await axios.post("/orderdetails", { order_id: id });
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_ORDER_DETAILS_SUCCESS,
          payload: { data: res.data },
        });
      }
    } catch (error) {
      console.log(error.response);
      // dispatch({
      //   type: authConstants.GET_ORDER_DETAILS_FAILURE,
      //   payload: { status: res.status, message: error.data.message },
      // });
    }
  };
};

const changeAdminOrderStatus = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CHANGE_ADMIN_ORDER_STATUS_REQUEST });
    let res = await axios.post("/changeOrderStatus", { ...data });
    if (res.status === 200) {
      console.log(res.data);
      dispatch({
        type: authConstants.CHANGE_ADMIN_ORDER_STATUS_SUCCESS,
      });
      dispatch(getOrderDetails(data.order_id));
    }
  };
};

const approveOrderDocument = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.APPROVE_ORDER_DOCUMENT_REQUEST });
      let res = await axios.post("/approveOrderDocument", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.APPROVE_ORDER_DOCUMENT_SUCCESS });
        dispatch(getOrderDetails(data.order_id));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
const rejectOrderDocument = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.REJECT_ORDER_DOCUMENT_REQUEST });
      let res = await axios.post("/rejectOrderDocument", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.REJECT_ORDER_DOCUMENT_SUCCESS });
        dispatch(getOrderDetails(data.order_id));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

const adminOrderReject = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.ADMIN_ORDER_REJECT_REQUEST });
    let res = await axios.post("/rejectOrder", { ...data });
    if (res.status === 200) {
      console.log(res.data);
      dispatch({ type: authConstants.ADMIN_ORDER_REJECT_SUCCESS });
      console.log("sending ", data.order_id);
      dispatch(data.order_id);
    }
    if (res.status === 400) {
      console.log(res.data);
    }
  };
};

const submitOrderTrackingNumber = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SUBMIT_ORDER_TRACKING_REQUEST });
    let res = await axios.post("/submitTrackingNumber", { ...data });
    if (res.status === 200) {
      console.log(res.data);
      dispatch({ type: authConstants.SUBMIT_ORDER_TRACKING_SUCCESS });
      console.log("sending ", data.order_id);
      dispatch(getOrderDetails(data.order_id));
    }
    if (res.status === 400) {
      console.log(res.data);
    }
  };
};

const submitOrderFile = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SUBMIT_ORDER_FILE_REQUEST });
      alert("making request");
      let res = await axios.post("/submitOrderFiles", data);
      // {
      // headers: { "Content-Type": "multipart/form" },
      // }
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.SUBMIT_ORDER_FILE_SUCCESS });
        console.log("sending ", data.order_id);
        dispatch(getOrderDetails(data.order_id));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
const confirmOrderDelivery = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.CONFIRM_ORDER_DELIVERY_REQUEST });
      alert("making request");
      let res = await axios.post("/changeOrderStatus", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: authConstants.CONFIRM_ORDER_DELIVERY_SUCCESS });
        dispatch(getOrderDetails(data.order_id));
      }
    } catch (error) {
      console.log(error.response);
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
      console.log(error.response);
    }
  };
};

export {
  getOrders,
  getOrderDetails,
  changeAdminOrderStatus,
  adminOrderReject,
  approveOrderDocument,
  rejectOrderDocument,
  submitOrderTrackingNumber,
  deleteOrder,
  submitOrderFile,
  confirmOrderDelivery,
};
