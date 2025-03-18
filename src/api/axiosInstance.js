import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://a10e1567844067ec.mokky.dev",
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});
