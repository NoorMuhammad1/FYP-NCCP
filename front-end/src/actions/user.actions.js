import axios from "../helpers/axios.js";
import { isUserLoggedIn, refreshUserData } from "./auth.actions.js";
import { authConstants } from "./constants";

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
        dispatch({
          type: authConstants.DASHBOARD_OPTIONS_UPDATE,
          payload: { option: "USERS" },
        });
      }
    } catch (e) {
      if (e.response && e.response.status === 405) {
        dispatch({ type: authConstants.LOGOUT });
      }
      if (e.response && e.response.status === 400) {
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

const getUserData = (id) => {
  return async (dispatch) => {
    console.log("fetching user data");
    dispatch({ type: authConstants.USER_DATA_REQUEST });
    const res = await axios.post("/userData", { id });
    if (res.status === 200) {
      dispatch({
        type: authConstants.USER_DATA_SUCCESS,
        payload: { user: res.data },
      });
    }
  };
};

const updateUserInfo = (data, id, role) => {
  return async (dispatch) => {
    // if (token) {
    dispatch({
      type: authConstants.UPDATING_USER_REQUEST,
      payload: { data: data },
    });

    try {
      const res = await axios.post("/updateUser", { data });
      console.log(res);
      if (res.status == 200) {
        dispatch({
          type: authConstants.UPDATING_USER_SUCCESS,
          payload: {
            status_code: res.status,
            message: res.data.message,
          },
        });
        if (role === "external") {
          dispatch(refreshUserData());
        } else {
          dispatch(getUserData(id));
        }
      }
    } catch (error) {
      console.log(error.response);
    }
    // }
  };
};
const updateUserProfilePicture = (data, id, role) => {
  return async (dispatch) => {
    // if (token) {
    dispatch({
      type: authConstants.UPDATING_USER_REQUEST,
      payload: { data: data },
    });

    try {
      const res = await axios.post("/updateUserProfilePicture", data);
      console.log(res);
      if (res.status == 200) {
        dispatch({
          type: authConstants.UPDATING_USER_SUCCESS,
          payload: {
            status_code: res.status,
            message: res.data.message,
          },
        });
        console.log(role);
        if (role === "external") {
          dispatch(refreshUserData());
        } else {
          dispatch(getUserData(id));
        }
      }
    } catch (error) {
      console.log(error.response);
    }
    // }
  };
};

const resetPassword = (data, role) => {
  return async (dispatch) => {
    console.log("user data sent to method was: ");
    console.log(data);
    dispatch({ type: authConstants.UPDATE_USER_PASSWORD_REQUEST });

    try {
      const res = await axios.post("/updatePassword", { ...data });
      if (res.status === 200) {
        console.log("user password updated successfully");
        dispatch({ type: authConstants.UPDATE_USER_PASSWORD_SUCCESS });
        if (role === "external") {
          dispatch(refreshUserData());
        } else {
          dispatch(getUserData(data.id));
        }
      }
    } catch (error) {
      console.log(error.data);
    }
  };
};

const deleteUser = (data) => {
  return async (dispatch) => {
    // console.log("user data sent to method was: ");
    // console.log(data);
    dispatch({ type: authConstants.USER_DELETE_REQUEST });

    try {
      const res = await axios.post("/deleteUser", { ...data });
      if (res.status === 200) {
        console.log("users deleted successfully");
        dispatch({ type: authConstants.USER_DELETE_SUCCESS });
        dispatch(getUsers());
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

const addUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.USER_ADD_REQUEST,
        payload: { data: userData },
      });
      const res = await axios.post("/addUser", userData);
      // console.log(res.status);
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: authConstants.USER_ADD_SUCCESS,
          payload: { message: res.data.message },
        });
        // dispatch(getUsers(token));
      }
      if (res.status === 405) {
        alert("Token has expired ");
        dispatch({ type: authConstants.LOGOUT });
      }
    } catch ({ response }) {
      console.log("err");
      console.log(response);
      dispatch({
        type: authConstants.USER_ADD_FAILURE,
        payload: {
          status: response.data.status,
          message: response.data.message,
        },
      });
    }
  };
};

export {
  getUsers,
  getUserData,
  updateUserInfo,
  deleteUser,
  addUser,
  updateUserProfilePicture,
  resetPassword,
};
