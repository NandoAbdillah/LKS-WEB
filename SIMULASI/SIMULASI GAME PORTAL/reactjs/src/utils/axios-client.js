import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
});

client.interceptors.request.use((config) => {

    const token = localStorage.getItem('ACCESS_TOKEN');

    if (token) {
        config.headers.Authorization = `Bearer ${token};`
    }

    return config;
})

client.interceptors.response.use((response) => {
    const { data } = response
    return data;
}, (error) => {
    const { response } = error;

    throw response;

})