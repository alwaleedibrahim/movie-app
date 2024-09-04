import axios from "axios";
const { VITE_BASE_URL, VITE_API_ACCESS_TOKEN } = import.meta.env;
const axiosiInstance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${VITE_API_ACCESS_TOKEN}`,
  },
});

axiosiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosiInstance;
