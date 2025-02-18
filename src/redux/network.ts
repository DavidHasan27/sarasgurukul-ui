import axios from "axios";
import { getUserDetails } from "../utils";
import { SERVER_URL } from "../utils/constants";

export const axiosPublic = axios.create({
  baseURL: SERVER_URL + "/api",
});
export const axiosPrivate = axios.create({
  baseURL: SERVER_URL + "/api",
});
axiosPrivate.interceptors.request.use(
  async (config) => {
    const token = getUserDetails().token;
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
