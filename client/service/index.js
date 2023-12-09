import axios from "axios";
import { baseUrl } from "../const";

export const jsxService = () =>
  axios.create({
    baseURL: baseUrl,
  });