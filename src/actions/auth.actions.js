import { authConstants } from "./constants";
import axios from "../helpers/axios";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
const login = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      console.log("hi");
      const res = await axios.post("/signin", userData);
      try {
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (error) {
        console.log(error);
      }

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { user: res.data.user, token: res.data.token },
      });
    } catch (error) {
      console.log(error);
      // console.log(error.response.data || error);
      if (error.response) {
        dispatch({
          type: authConstants.TOAST_ADD,
          payload: { message: error.response.data.message },
        });
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            status_code: error.response.status,
            message: error.response.data.message,
          },
        });
      }
    }
  };
};
export { login };
