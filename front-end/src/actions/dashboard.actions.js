import axios from "../helpers/axios.js";
import urls from "../server_urls.js";
import { getCatalogueData } from "./catalogue.actions.js";
import { authConstants } from "./constants";
import { getUsers } from "./user.actions.js";

export const getDashboardData = (token) => {
  return async (dispatch) => {
    // dispatch(getUsers(token));
    // dispatch(getCatalogueData(token));
  };
};
