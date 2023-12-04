
// default: ajax request module
import axios from 'axios'
import { Toast } from 'antd-mobile';

import { config } from '../config/index.js';
import Cookies from 'js-cookie';
import store from '../redux/store.js';
const BASE_URL = config[process.env.NODE_ENV].BASE_URL;
// online for test
// const BASE_URL = config.production.BASE_URL;
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});


// requset interceptor
instance.interceptors.request.use(function (config) {
  const tt = store.getState().user;
  console.log(tt);
  const userid = Cookies.get('userid');
  if (userid) {
    config.headers = {
      "jobs-token": userid
    }
  }
  return config;
}, function (error) {
  // error handling
  return Promise.reject(error);
});
 
// response interceptor
instance.interceptors.response.use(function (response) {
  if(response.data.code === 0) {
    return response.data;
  } else {
    Toast.info(response.data.msg, 2)
    return Promise.reject(response.data);
  }
  // get inner data
}, function (error) {
  Toast.info(JSON.stringify(error), 2)
  return Promise.reject(error);
});

export default instance