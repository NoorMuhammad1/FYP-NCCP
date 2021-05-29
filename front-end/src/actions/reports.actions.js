import axios from "../helpers/axios";
import { authConstants } from "./constants";

const getReport = (report_type) => {
  let url = "";
  switch (report_type) {
    case "payment":
      url = "/paymentReport";
      break;
    case "order":
      url = "/orderReport";
      break;
    case "deposit":
      url = "/depositReport";
      break;
    case "microorganism":
      url = "/microorganismReport";
      break;
    case "user":
      url = "/userReport";
      break;
    case "log":
      url = "/logslist";
      break;
    default:
      url = "/adminReport";
      break;
  }
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.FETCH_REPORT_REQUEST });
      let res = await axios.post(url);
      console.log(res.data);
      dispatch({
        type: authConstants.FETCH_REPORT_SUCCESS,
        payload: { data: res.data },
      });
    } catch (error) {
      console.log(error);
      // console.log(error.response);
      // dispatch({
      //   type: authConstants.FETCH_REPORT_FAILURE,
      //   payload: { status_code: error.status, message: error.response.message },
      // });
    }
  };
};

export { getReport };
