import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5800/api'
})

export default axiosClient;