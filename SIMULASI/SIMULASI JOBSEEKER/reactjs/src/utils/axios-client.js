import axios from "axios";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
});


client.interceptors.request.use((config) => {

    const token = localStorage.getItem("ACCESS_TOKEN") || null;
    if (token) {
        config.params = {
            ...config.params,
            token: token
        }
    }

    return config;
});


client.interceptors.response.use((res) => {
    return res;
}, (err) => {
    const { response } = err;
    throw response
});


export default client;