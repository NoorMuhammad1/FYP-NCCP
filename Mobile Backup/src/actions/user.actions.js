import { authConstants } from "./constants";
import axios from "../helpers/axios";
const getUsers = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USERS_FETCH_REQUEST });
    try {
      console.log("making a request for the users");
      let user_Request_Response = await axios.post("/users", {});
      if (user_Request_Response.status === 200) {
        dispatch({
          type: authConstants.USERS_FETCH_SUCCESS,
          payload: { users: user_Request_Response.data },
        });
      }
    } catch (e) {
      if (e.response && e.response.status === 405) {
        dispatch({ type: authConstants.LOGOUT });
      }
      if (e.response && e.response.status === 400) {
        console.log(e.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: e.response.data.message },
        });
        dispatch({
          type: authConstants.USERS_FETCH_FAILURE,
          payload: {
            status_code: e.response.status,
            message: e.response.data.message,
          },
        });
      }
    }
  };
};

const deleteUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USER_DELETE_REQUEST });
    try {
      const res = await axios.post("/deleteUser", { ...data });
      if (res.status === 200) {
        console.log("users deleted successfully");
        dispatch({ type: authConstants.USER_DELETE_SUCCESS });
        dispatch(getUsers());
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: e.response.data.message },
        });
        dispatch({
          type: authConstants.USERS_FETCH_FAILURE,
          payload: {
            status_code: e.response.status,
            message: e.response.data.message,
          },
        });
      } else {
        console.log(error);
      }
    }
  };
};

export { getUsers, deleteUser };
