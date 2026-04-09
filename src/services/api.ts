import { BASEURL } from "@/app.env";
import axios from "axios";

const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

export default api;
