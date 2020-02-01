import LocalStorage from './localstorage';

const axios = require('axios');

const LS = new LocalStorage();
const remote = 'http://localhost:4000/api/v1/';
// const remote = 'http://192.168.0.116:4000/api/v1';

const instance = axios.create({
  baseURL: remote,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${LS.getItem('authtoken')}`,
    version: 'v1.0.0',
  },
});
export default instance;
