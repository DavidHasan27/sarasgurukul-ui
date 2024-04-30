import axios from "axios";
import { getUserDetails } from "../utils";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:8089/api",
});
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8089/api",
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
