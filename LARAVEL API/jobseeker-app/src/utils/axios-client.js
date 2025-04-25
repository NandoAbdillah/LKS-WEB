import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const { response } = err;

    throw response;
  }
);

export default axiosClient;
