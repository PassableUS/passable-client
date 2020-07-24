import axios from 'axios';
import config from './config';

axios.defaults.baseURL = config.baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = config.timeoutTime; // Default timeout

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    alert('Axios Error: ' + JSON.stringify(error));
    return Promise.reject(error);
  }
);

export function setAxiosToken(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
