import axios from "../helpers/axios";
import { authConstants } from "./constants";

const getPricesAndDocuments = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.GET_PRICES_REQUEST });
      dispatch({ type: authConstants.GET_DOCUMENTS_REQUEST });
      let res = await axios.get("/getPricesAndDocuments");
      console.log(res);
      dispatch({
        type: authConstants.GET_PRICES_SUCCESS,
        payload: { data: res.data.price },
      });
      dispatch({
        type: authConstants.GET_DOCUMENTS_SUCCESS,
        payload: { data: res.data.documents },
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: authConstants.GET_PRICES_FAILURE,
        payload: { status_code: error.status, message: error.response.message },
      });
    }
  };
};

const updatePrices = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SET_PRICES_REQUEST });
      let res = await axios.post("/updatePrices", { data });
      console.log(res);
      dispatch({
        type: authConstants.SET_PRICES_SUCCESS,
        payload: { message: res.data.message },
      });
      dispatch(getPricesAndDocuments());
    } catch (error) {
      console.log(error);
      dispatch({
        type: authConstants.SET_PRICES_FAILURE,
        payload: { message: "Could not update Prices" },
      });
    }
  };
};

const removeDocuments = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.REMOVE_DOCUMENTS_REQUEST });
      let res = await axios.post("/removeDocument", { ...data });
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: authConstants.REMOVE_DOCUMENTS_SUCCESS });
        dispatch(getPricesAndDocuments());
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: authConstants.REMOVE_DOCUMENTS_FAILURE });
    }
  };
};

const addDocument = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.UPLOAD_DOCUMENTS_REQUEST });
      let res = await axios.post("/updateDocuments", data);
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: authConstants.UPLOAD_DOCUMENTS_SUCCESS,
          payload: { message: res.data.message },
        });
        dispatch(getPricesAndDocuments());
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: authConstants.UPLOAD_DOCUMENTS_FAILURE,
        payload: { status_code: error.status, message: "Nothing" },
      });
    }
  };
};

const share = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SHARE_DATA_DOCUMENTS_REQUEST });
      let res = await axios.post("/sharing", data);
      if (res.status === 200) {
        console.log(res.data);

        dispatch({
          type: authConstants.SHARE_DATA_DOCUMENTS_SUCCESS,
          payload: { message: res.data.message },
        });
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: {
            message: res.data.message,
          },
        });
      }
      if (res.status === 400) {
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.SHARE_DATA_DOCUMENTS_FAILURE,
          payload: {
            message: error.response.data.message,
            status_code: error.response.status,
          },
        });
      } else {
        console.log(error);
      }
    }
  };
};

export {
  getPricesAndDocuments,
  updatePrices,
  removeDocuments,
  addDocument,
  share,
};
