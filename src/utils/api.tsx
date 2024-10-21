import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.defaults.baseURL = process.env.API_URL;

api.interceptors.request.use(
  config => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token === null) {
      return config;
    }
    // config.headers['Authorization'] = `Bearer ${
    //   localStorage.getItem('token') || sessionStorage.getItem('token')
    // }`;
    // const sns = localStorage.getItem('sns') || null;
    // if (localStorage.getItem('sns')) {
    //   config.headers['x-sns-name'] = sns;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config;
    if (err.response.status === 401 && originalConfig.url !== '/auth/token') {
      try {
        const rs = await api.get('/auth/token');
        const {token} = rs.data;
        const isRemember = localStorage.getItem('remember');
        const storage = isRemember === 'true' ? localStorage : sessionStorage;
        storage.setItem('token', token);
        return api(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    if (err.response.data === 'Expired token') {
      const token = localStorage.token || sessionStorage.token;
      if (token) {
        const config = {
          headesr: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.get('/auth/logout', config);
      }
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('recipe');
      localStorage.removeItem('sns');
    }
    return Promise.reject(err);
  },
);

export default api;
