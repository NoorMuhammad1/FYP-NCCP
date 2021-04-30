import axios             from '../helpers/axios.js';
import urls              from '../server_urls.js/index';
import { authConstants } from './constants';

const getCatalogueData = (token) => {
  return async (dispatch) => {
    //getting catalogue data
    dispatch({ type: authConstants.CATALOGUE_INFO_REQUEST });
    const catalogue_Request_Response = await axios.post('/catalogue', {});
    if (catalogue_Request_Response.status === 200) {
      dispatch({
                 type   : authConstants.CATALOGUE_INFO_SUCCESS,
                 payload: { data: catalogue_Request_Response.data },
               });
      dispatch({
                 type   : authConstants.DASHBOARD_OPTIONS_UPDATE,
                 payload: { option: 'CATALOGUE' },
               });
    }
  };
};

const fetchCatalogueData = () => {
  return async (dispatch) => {
    // console.log("sending fetch catalogue info request");
    dispatch({ type: authConstants.CATALOGUE_INFO_REQUEST });
    await fetch(urls.FETCH_CATALOGUE_DATA_URL, {
      method: 'GET',
    })
      .then((res) => {
        res.json().then((data) => {
          if (res.status === 200) {
            // console.log("Fetched the data successfully");
            // console.log(data.dataArray);
            dispatch({
                       type   : authConstants.CATALOGUE_INFO_SUCCESS,
                       payload: {
                         data: data.dataArray,
                       },
                     });
            return;
          }
          if (res.status === 400) {
            console.log('Server responded with an error while fetching data');
            dispatch({
                       type   : authConstants.CATALOGUE_INFO_FAILURE,
                       payload: {
                         status_code: res.status,
                         message    : data,
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
    console.log('fetching data from api');

    fetch(urls.FETCH_ITEM_DATA_URL, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ id, role }),
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          dispatch({
                     type   : authConstants.CATALOGUE_ITEM_SUCCESS,
                     payload: { data },
                   });
          console.log('Object data fetch successful action dispatched');
        }
        else {
          dispatch({
                     type   : authConstants.CATALOGUE_ITEM_FAILURE,
                     payload: { status_code: res.status, message: data.message },
                   });
          console.log('Object data fetch failure action dispatched');
        }
      });
    });
  };
};

const addMicroorganism = (data, token) => {
  return async (dispatch) => {
    dispatch({
               type   : authConstants.ADD_MICROORGANISM_REQUEST,
               payload: {
                 data,
               },
             });

    try {
      const res = await axios.post('/addMicroorganism', data, {
        // headers: { authorization: token },
      });
      console.log(res);
      if (res.status === 200) {
        console.log('record added successfully');
        dispatch({ type: authConstants.ADD_MICROORGANISM_SUCCESS });
        dispatch(getCatalogueData(token));
      }
    }
    catch (error) {
      dispatch({
                 type   : authConstants.ADD_MICROORGANISM_FAILURE,
                 payload: {
                   code   : error.response.status,
                   message: error.response.data.message,
                 },
               });
    }
  };
};

const resetAddMicroorganismState = () => {
  return (dispatch) => {
    dispatch({ type: authConstants.RESET_ADD_MICROORGANISM_STATE });
  };
};

const deleteMicroorganism = (data, token) => {
  return async (dispatch) => {
    dispatch({
               type   : authConstants.CATALOGUE_DELETE_ITEM_REQUEST,
               payload: { data },
             });
    try {
      const res = await axios.post('/deletemicroorganism', data, {
        // headers: { authorization: token },
      });
      if (res.status === 200) {
        console.log(res);
        dispatch({ type: authConstants.CATALOGUE_DELETE_ITEM_SUCCESS });
        dispatch(getCatalogueData(token));
      }
    }
    catch (error) {
      console.log(error.response.data);
      dispatch({
                 type   : authConstants.CATALOGUE_DELETE_ITEM_FAILURE,
                 payload: {
                   code   : error.response.status,
                   message: error.response.data.message,
                 },
               });
    }
  };
};

export {
  getCatalogueData,
  fetchCatalogueData,
  fetchItemDetails,
  addMicroorganism,
  resetAddMicroorganismState,
  deleteMicroorganism
};
