import axios from "axios";
const BASE_URL = "https://studentbackend-3bgy.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });
        if (data.accessToken) {  
          localStorage.setItem("accessToken", data.accessToken);
          return axiosInstance(error.config); 
        }
      }catch (error) {
        console.error("Refresh token invalid:", error.response?.data?.message);
        alert("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
