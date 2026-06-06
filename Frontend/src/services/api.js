import axios from "axios";

const api = axios.create({
  baseURL: "https://store-rating-webapp.onrender.com/api",
});

export default api;