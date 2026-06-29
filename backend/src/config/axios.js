import dotenv from "dotenv";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});
console.log("Base api URL: ", process.env.API_BASE_URL);
export default api;
