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
export { getDeposits, deleteDeposit };
