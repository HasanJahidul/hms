import axios from "../axiosConfig.js";
import { baseApiUrl, baseUrl } from "../const";

export const jsxService = () =>
  axios.create({
    baseURL: baseUrl,
  });
export const apiService = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // Include credentials for session authentication
  });
