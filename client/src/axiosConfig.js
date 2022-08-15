import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL:"http://localhost:5000",
    withCredentials: false,
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
});

export default axiosInstance;