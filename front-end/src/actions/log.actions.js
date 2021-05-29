import axios from "../helpers/axios";
import { authConstants } from "./constants";

const getLogs = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_LOGS_REQUEST });
    try {
      const res = await axios.get("/logslist");
      if (res.status === 200) {
        console.log("data sent to reducer", res.data);
        dispatch({
          type: authConstants.GET_LOGS_SUCCESS,
          payload: { data: res.data },
        });
      }
    } catch (error) {
      console.log(error.response);
      // dispatch({
      //   type: authConstants.GET_LOGS_FAILURE,
      //   payload: { status: res.status, message: error.data.message },
      // });
    }
  };
};

const getLogDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_LOG_DETAILS_REQUEST });
    try {
      console.log("making the request to logdetials");
      const res = await axios.post("/getLogDetails", { log_id: id });
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_LOG_DETAILS_SUCCESS,
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

const deleteLogs = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGS_DELETE_REQUEST });

    try {
      const res = await axios.post("/deleteLogs", { ...data });
      if (res.status === 200) {
        console.log("log deleted successfully");
        dispatch({ type: authConstants.LOGS_DELETE_SUCCESS });
        dispatch(getLogs());
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export { getLogDetails, getLogs, deleteLogs };
