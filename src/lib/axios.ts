import axios from 'axios';
import Boom from '@hapi/boom';

axios.interceptors.response.use((response) => {
  if (response.data.error) {
    console.log(response.data.error);
    const boom = Boom.badRequest(response.data.error.message);
    return Promise.reject(boom);
  }
  return response;
});

export default axios;
