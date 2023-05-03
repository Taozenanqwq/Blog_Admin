import axios from 'axios';
export const request = (config) => {
  const http = axios.create({
    baseURL: '/api/v1',
  });
  http.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log('request err', err);
    }
  );
  http.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (err) => {
      console.log('response err', err.response);
    }
  );
  return http(config);
};
