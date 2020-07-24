import axios from '../utils/axios';

export const getProfile = async () => {
  const data = axios.get('/session/profile').then(res => res.data);
  return data;
};

export default {
  getProfile,
};
