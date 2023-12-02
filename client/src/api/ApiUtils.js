import axios from "axios";
import { baseURL } from "utils/Config";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
