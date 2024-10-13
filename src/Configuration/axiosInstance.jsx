import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog-application-backend-o31x.onrender.com/user',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosInstance

