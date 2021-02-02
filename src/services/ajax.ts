// abstraction when making ajax calls
// This can use builtin nodejs fetch if you don't want to use an external library

import axios from 'axios';

const ajax = axios.create({
  timeout: 15000, // 15 seconds,
  proxy: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default ajax;
