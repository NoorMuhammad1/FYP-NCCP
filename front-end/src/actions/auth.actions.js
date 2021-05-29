import axios from "../helpers/axios";
import { authConstants } from "./constants";

const login = (userData) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = axios.post("/signin", {
      ...userData,
    });
    if ((await res).status === 200) {
      const { token, user } = (await res).data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
      alert("dispatching login success action");
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if ((await res).status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: (await res).data.error },
        });
      }
    }
  };
};

const forgetPassword = (data) => {
  return async (dispatch) => {
    alert(data.email);
  };
};

const logout = () => {
  return async (dispatch) => {
    // localStorage.clear();
    dispatch({
      type: authConstants.LOGOUT,
      payload: { description: "LOGOUT REQUEST" },
    });
  };
};

const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    }
    // else {
    //   console.log("dispatching action to reset state to initial state");
    //   dispatch({
    //     type: authConstants.LOGIN_FAILURE,
    //   });
    // }
  };
};

const refreshUserData = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/refreshUser", { token });
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user: res.data.user,
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export { login, refreshUserData, forgetPassword, logout, isUserLoggedIn };
