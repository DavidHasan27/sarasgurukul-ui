import axios from "axios";
import { getAuthToken } from "../utils";
import { SERVER_URL } from "../utils/constants";

export const axiosPublic = axios.create({
  baseURL: SERVER_URL + "/api",
});
export const axiosPrivate = axios.create({
  baseURL: SERVER_URL + "/api",
});
axiosPrivate.interceptors.request.use(
  async (config) => {
    const auth = getAuthToken();
    if (auth) {
      config.headers["Authorization"] = auth;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
