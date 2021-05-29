import axios from "../helpers/axios.js";
// import urls from "../server_urls.js/index";
import { authConstants } from "./constants";

const getCatalogueData = (token) => {
  return async (dispatch) => {
    //getting catalogue data
    dispatch({ type: authConstants.CATALOGUE_INFO_REQUEST });
    const catalogue_Request_Response = await axios.post("/catalogue", {});
    if (catalogue_Request_Response.status === 200) {
      dispatch({
        type: authConstants.CATALOGUE_INFO_SUCCESS,
        payload: { data: catalogue_Request_Response.data },
      });
      dispatch({
        type: authConstants.DASHBOARD_OPTIONS_UPDATE,
        payload: { option: "CATALOGUE" },
      });
    }
  };
};

const fetchCatalogueData = () => {
  return async (dispatch) => {
    // console.log("sending fetch catalogue info request");
    dispatch({ type: authConstants.CATALOGUE_INFO_REQUEST });
    await fetch(urls.FETCH_CATALOGUE_DATA_URL, {
      method: "GET",
    })
      .then((res) => {
        res.json().then((data) => {
          if (res.status === 200) {
            // console.log("Fetched the data successfully");
            // console.log(data.dataArray);
            dispatch({
              type: authConstants.CATALOGUE_INFO_SUCCESS,
              payload: {
                data: data.dataArray,
              },
            });
            return;
          }
          if (res.status === 400) {
            console.log("Server responded with an error while fetching data");
            dispatch({
              type: authConstants.CATALOGUE_INFO_FAILURE,
              payload: {
                status_code: res.status,
                message: data,
              },
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const fetchItemDetails = (id, role) => {
  return (dispatch) => {
    dispatch({ type: authConstants.CATALOGUE_ITEM_REQUEST });
    console.log("fetching data from api");

    fetch(urls.FETCH_ITEM_DATA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role }),
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          dispatch({
            type: authConstants.CATALOGUE_ITEM_SUCCESS,
            payload: { data },
          });
          console.log("Object data fetch successful action dispatched");
        } else {
          dispatch({
            type: authConstants.CATALOGUE_ITEM_FAILURE,
            payload: { status_code: res.status, message: data.message },
          });
          console.log("Object data fetch failure action dispatched");
        }
      });
    });
  };
};

const addMicroorganism = (data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.ADD_MICROORGANISM_REQUEST,
      payload: {
        data,
      },
    });

    try {
      const res = await axios.post("/addMicroorganism", data, {
        // headers: { authorization: token },
      });
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch({ type: authConstants.ADD_MICROORGANISM_SUCCESS });
        // dispatch(getCatalogueData(token));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.ADD_MICROORGANISM_FAILURE,
          payload: {
            code: error.response.status,
            message: error.response.data.message,
          },
        });
      } else {
        console.log(error);
      }
    }
  };
};

const resetAddMicroorganismState = () => {
  return (dispatch) => {
    dispatch({ type: authConstants.RESET_ADD_MICROORGANISM_STATE });
  };
};

// const deleteMicroorganism = (data, token) => {
//   return async (dispatch) => {
//     dispatch({
//       type: authConstants.CATALOGUE_DELETE_ITEM_REQUEST,
//       payload: { data },
//     });
//     try {
//       const res = await axios.post("/deletemicroorganism", data, {
//         // headers: { authorization: token },
//       });
//       if (res.status === 200) {
//         console.log(res);
//         dispatch({ type: authConstants.CATALOGUE_DELETE_ITEM_SUCCESS });
//         dispatch(getCatalogueData(token));
//       }
//     } catch (error) {
//       console.log(error.response.data);
//       dispatch({
//         type: authConstants.CATALOGUE_DELETE_ITEM_FAILURE,
//         payload: {
//           code: error.response.status,
//           message: error.response.data.message,
//         },
//       });
//     }
//   };
// };

const getMicroorganisms = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.DASHBOARD_CATALOUGE_REQUEST });
    try {
      const res = await axios.get("/microorganismlist");
      if (res.status === 200) {
        dispatch({
          type: authConstants.DASHBOARD_CATALOGUE_SUCCESS,
          payload: { data: res.data },
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.DASHBOARD_CATALOUGE_FAILURE,
          payload: { status: res.status, message: error.data.message },
        });
      } else {
        console.log(error);
      }
    }
  };
};

const deleteMicroorganism = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.MICROORGANISM_DELETE_REQUEST });
    try {
      const res = await axios.post("/deleteMicroorganism", { ...data });
      if (res.status === 200) {
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch({ type: authConstants.MICROORGANISM_DELETE_SUCCESS });
        dispatch(getMicroorganisms());
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

const fetchMicroorganismData = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.FETCH_MICROORGANISM_DETAILS_REQUEST });
    try {
      const res = await axios.post("/fetchMicroorganismData", { ...data });
      if (res.status === 200) {
        console.log("data successfully");
        // dispatch({
        //   type: authConstants.TOAST_ADD,
        //   payload: { message: res.data.message },
        // });
        dispatch({
          type: authConstants.FETCH_MICROORGANISM_DETAILS_SUCCESS,
          payload: { data: res.data },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
const updateMicroorganismData = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.UPDATE_MICROORGANISM_DETAILS_REQUEST });
    try {
      const res = await axios.post("/updatemicroorganism", { ...data });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: res.data.message },
        });
        dispatch({
          type: authConstants.UPDATE_MICROORGANISM_DETAILS_SUCCESS,
          payload: { data: res.data },
        });
        // dispatch(fetchMicroorganismData({ id: data.id }));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.UPDATE_MICROORGANISM_DETAILS_FAILURE,
          payload: {
            status_code: error.status,
            message: error.response.data.message,
          },
        });
        // dispatch({
        //   type: authConstants.ADD_MICROORGANISM_FAILURE,
        //   payload: {
        //     code: error.response.status,
        //     message: error.response.data.message,
        //   },
        // });
      } else {
        console.log(error);
      }
    }
  };
};
export {
  fetchMicroorganismData,
  getMicroorganisms,
  getCatalogueData,
  fetchCatalogueData,
  fetchItemDetails,
  addMicroorganism,
  updateMicroorganismData,
  resetAddMicroorganismState,
  deleteMicroorganism,
};
