import { authConstants } from "./constants";
import axios from "../helpers/axios";
import { Platform } from "react-native";
import mime from "mime";
import { cos } from "react-native-reanimated";
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

const getUserData = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.USER_DATA_REQUEST });
      const res = await axios.post("/userData", { id });
      if (res.status === 200) {
        dispatch({
          type: authConstants.USER_DATA_SUCCESS,
          payload: { user: res.data },
        });
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: e.response.data.message },
        });
        dispatch({
          type: authConstants.USER_DATA_FAILURE,
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

const addUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.USER_ADD_REQUEST,
        payload: { data: userData },
      });
      const res = await axios.post("/addUser", userData);
      if (res.status === 200) {
        console.log(res.data);
        dispatch({
          type: authConstants.USER_ADD_SUCCESS,
          payload: { message: res.data.message },
        });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
      }
      if (res.status === 405) {
        alert("Token has expired ");
        dispatch({ type: authConstants.LOGOUT });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.USER_ADD_FAILURE,
          payload: {
            status: error.response.data.status,
            message: error.response.data.message,
          },
        });
      } else {
        console.log(error);
      }
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
      // console.log(res);
      if (res.status == 200) {
        dispatch({
          type: authConstants.UPDATING_USER_SUCCESS,
          payload: {
            status_code: res.status,
            message: res.data.message,
          },
        });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: {
            message:
              "Data has been updated successfully. Login again if you want to see the changes",
          },
        });
        if (role === "external") {
          dispatch(refreshUserData());
        } else {
          dispatch(getUserData(id));
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        // dispatch({
        //   type: authConstants.USER_ADD_FAILURE,
        //   payload: {
        //     status: error.response.data.status,
        //     message: error.response.data.message,
        //   },
        // });
      } else {
        console.log(error);
      }
    }
    // }
  };
};
const updateUserProfilePicture = (data, id, role) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.UPDATING_USER_REQUEST,
      payload: { data: data },
    });

    try {
      const res = await axios.post("/updateUserProfilePicture", data);
      if (res.status == 200) {
        console.log(res.data.message);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
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
      if (error.response) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        // dispatch({
        //   type: authConstants.USER_ADD_FAILURE,
        //   payload: {
        //     status: error.response.data.status,
        //     message: error.response.data.message,
        //   },
        // });
      } else {
        console.log(error);
      }
    }
    // }
  };
};
export {
  getUsers,
  deleteUser,
  addUser,
  getUserData,
  updateUserInfo,
  updateUserProfilePicture,
};
