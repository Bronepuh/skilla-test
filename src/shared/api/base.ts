import axios from 'axios';

export const apiInstance = axios.create({
  method: 'POST',
  headers: {
    authorization: 'Bearer testtoken',
  }
});
