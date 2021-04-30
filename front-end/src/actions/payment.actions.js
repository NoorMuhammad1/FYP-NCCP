import axios from "../helpers/axios.js";
import urls from "../server_urls.js";
import { authConstants } from "./constants";

export const confirmPayment = (data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.PAYMENT_REQUEST,
      payload: { token: data.token, items: data.products },
    });

    try {
      const res = await axios.post("orderPayment", { ...data });
      console.log("confirm payment response: ", res);
      if (res.status === 200) {
        dispatch({
          type: authConstants.PAYMENT_SUCCESSFULL,
          payload: {
            message: res.message,
            status: res.status,
          },
        });
      }
    } catch (error) {
      console.log("confirm payment error", error.response);
      if (error.response && error.response.status === 400) {
        dispatch({
          type: authConstants.PAYMENT_FAILURE,
          payload: {
            message: error.response.message,
            status: error.response.status,
          },
        });
      }
    }
  };
};
