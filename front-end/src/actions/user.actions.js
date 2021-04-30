import axios             from '../helpers/axios.js';
import { authConstants } from './constants';

const getUsers = (token) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USERS_FETCH_REQUEST });
    try {
      let user_Request_Response = await axios.post('/users', {});
      if (user_Request_Response.status === 200) {
        dispatch({
                   type   : authConstants.USERS_FETCH_SUCCESS,
                   payload: { users: user_Request_Response.data },
                 });
        dispatch({
                   type   : authConstants.DASHBOARD_OPTIONS_UPDATE,
                   payload: { option: 'USERS' },
                 });
      }
    }
    catch (e) {
      if (e.response && e.response.status === 405) {
        dispatch({ type: authConstants.LOGOUT });
      }
      if (e.response && e.response.status === 400) {
        dispatch({
                   type   : authConstants.USERS_FETCH_FAILURE,
                   payload: {
                     status_code: e.response.status,
                     message    : e.response.data.message,
                   },
                 });
      }
    }
  };
};

const getUserData = (id, token) => {
  return async (dispatch) => {
    if (token) {
      console.log('fetching user data');
      dispatch({ type: authConstants.USER_DATA_REQUEST });
      const res = await axios.post(
        '/userData',
        { id }
        // { headers: { authorization: token } }
      );
      dispatch({
                 type   : authConstants.USER_DATA_SUCCESS,
                 payload: { user: res.data },
               });
    }
  };
};

const updateUserInfo = (data, token) => {
  return async (dispatch) => {
    if (token) {
      dispatch({
                 type   : authConstants.UPDATING_USER_REQUEST,
                 payload: { data: data },
               });

      try {
        const res = await axios.post(
          '/updateUser',
          { data }
          // {
          //   headers: { authorization: token },
          // }
        );

        if (res.status == 200) {
          dispatch({
                     type   : authConstants.UPDATING_USER_SUCCESS,
                     payload: {
                       status_code: res.status,
                       message    : res.data.message,
                     },
                   });
          dispatch(getUsers(token));
        }
      }
      catch (error) {
        console.log(error.data);
      }
    }
  };
};

const deleteUser = (data, token) => {
  return async (dispatch) => {
    console.log('user data sent to method was: ');
    console.log(data);
    dispatch({ type: authConstants.USER_DELETE_REQUEST });

    try {
      const res = await axios.post(
        '/deleteUser',
        { id: data }
        // { headers: { authorization: token } }
      );
      if (res.status === 200) {
        console.log('user deleted successfully');
        dispatch({ type: authConstants.USER_DELETE_SUCCESS });
        dispatch(getUsers(token));
      }
    }
    catch (error) {
      console.log(error.data);
    }
  };
};

const addUser = (userData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
                 type   : authConstants.USER_ADD_REQUEST,
                 payload: { data: userData },
               });
      const res = await axios.post('/addUser', userData, {
        headers: {
          authorization: token,
        },
      });
      // console.log(res.status);
      if (res.status === 200) {
        dispatch({
                   type   : authConstants.USER_ADD_SUCCESS,
                   payload: { message: res.data.message },
                 });
        // dispatch(getUsers(token));
      }
      if (res.status === 405) {
        alert('Token has expired ');
        dispatch({ type: authConstants.LOGOUT });
      }
    }
    catch ({ response }) {
      console.log('err');
      console.log(response);
      dispatch({
                 type   : authConstants.USER_ADD_FAILURE,
                 payload: {
                   status : response.data.status,
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
  addUser
};
