import { authConstants } from "./constants";
import axios from "../helpers/axios";
//import { useEffect } from "react";
export const login = (userData) => {
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

export const forgetPassword = (data) => {
  return async (dispatch) => {
    alert(data.email);
  };
};

export const logout = () => {
  return async (dispatch) => {
    // localStorage.clear();
    dispatch({
      type: authConstants.LOGOUT,
      payload: { description: "LOGOUT REQUEST" },
    });
  };
};
export const isUserLoggedIn = () => {
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
