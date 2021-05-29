import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import store from "../store";

// const token = AsyncStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "http://192.168.8.101:2000/api",
  headers: {
    "Content-Type": "application/json",
    // authorization: token ? `${token}` : ``,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer 2 ${token}`;
    }
  } catch (error) {
    console.log("found an error in the axios file for the async storage");
  }

  // const { auth } = store.getState();
  // if (auth.token != null) {
  //   req.headers.Authorization = `Bearer ${auth.token}`;
  // }
  return req;
});

export default axiosInstance;
