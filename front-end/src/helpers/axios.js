import axios from "axios";
import store from "../store";

const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:2000/api",
  headers: {
    authorization: token ? `${window.localStorage.getItem("token")}` : ``,
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { response } = error;

    if (!response) {
      alert("There was some error on the serverside. Try again");
    }
    if (response) {
      if (response.status === 500) {
        console.log("token expired");
        console.log(response);
      }

      // if (response.status === 400) {
      //   console.log("handling response in the axios.js file");
      //   console.log(response);
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
