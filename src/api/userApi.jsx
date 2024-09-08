import axios from "axios";
const {VITE_USER_API_BASE_URL} = import.meta.env
const axiosInstance = axios.create({
    baseURL: VITE_USER_API_BASE_URL
})

export default axiosInstance