import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
});

axiosClient.interceptors.request.use((config) => {

    const token = localStorage.getItem('ACCESS_TOKEN') || null;
    if (token) {
        config.params =  {
            ...config.params,
            token : token
        }
    }

    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error

    throw response;
})

export default axiosClient;