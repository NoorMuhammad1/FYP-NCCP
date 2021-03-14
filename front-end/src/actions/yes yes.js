import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const signup = (userData) => {
  return async (dispatch) => {
    console.log("Sending signup request");
    dispatch({
      type: authConstants.SIGNUP_REQUEST,
      payload: { userData: userData },
    });

    fetch("http://localhost:2000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    })
      .then((res) => {
        if (res.status === 409) {
          res.json().then((data) => {
            dispatch({
              type: authConstants.SIGNUP_FAILURE,
              payload: { status_code: res.status, message: data.message },
            });
          });
          return;
        }
        if (res.status === 200) {
          dispatch({
            type: authConstants.SIGNUP_SUCCESS,
          });
          return;
        }
        if (res.status === 500) {
          console.log("Something went wrong at the server");
          res.json().then((data) => {
            dispatch({
              type: authConstants.SIGNUP_FAILURE,
              payload: { status_code: res.status, message: data.message },
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // await axios
    //   .post("/signup", { ...userData })
    //   .then((res) => console.log(res.data))
    //   .catch((error) => console.log(error));

    // const res = axios.post("/signup", {
    //   ...userData,
    // });
    // console.log(await res);
    // if ((await res).status === 404) {
    //   console.log("404 recieved");
    // }
    // if ((await res).status === 200) {
    //   console.log("signup successful");
    //   dispatch({
    //     type: authConstants.SIGNUP_SUCCESS,
    //     payload: { message: (await res).data.message },
    //   });
    // } else {
    //   console.log("heelo");
    //   if ((await res).status === 404) {
    //     console.log("Same user already exists");
    //     dispatch({
    //       type: authConstants.SIGNUP_FAILURE,
    //       payload: { message: (await res).data.message },
    //     });
    //   } else {
    //     if ((await res).status === 400) {
    //       console.log("FOrm not submiited");
    //       dispatch({
    //         type: authConstants.SIGNUP_FAILURE,
    //         payload: { error: (await res).data.error },
    //       });
    //     }
    //   }
    // }
  };
};
