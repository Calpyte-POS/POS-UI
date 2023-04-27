import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/user/'
});

instance.interceptors.request.use(
    (config) => {
        // Modify the request config
        // config.headers.Authorization = 'Bearer token';
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // Modify the response data
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default instance;
