import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-dxbe.onrender.com"
});

export default api;
