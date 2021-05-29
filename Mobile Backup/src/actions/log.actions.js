import { authConstants } from "./constants";
import axios from "../helpers/axios";

const getLogs = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_LOGS_REQUEST });
    try {
      const res = await axios.get("/logslist");
      if (res.status === 200) {
        dispatch({
          type: authConstants.GET_LOGS_SUCCESS,
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
          type: authConstants.GET_LOGS_FAILURE,
          payload: { status: res.status, message: error.data.message },
        });
      } else {
        console.log(error);
      }
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
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
      }
    }
  };
};

export { getLogs, deleteLogs };
