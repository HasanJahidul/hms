import axios from "axios";
import { baseApiUrl, baseUrl } from "../const";

export const jsxService = () =>
  axios.create({
    baseURL: baseUrl,
  });