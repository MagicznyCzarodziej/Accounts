import axios from 'axios';
import config from '@/config';
import store from '@/store/Store';

export default () => {
  return axios.create({
    baseURL: config.apiUrl,
    headers: {
      Authorization: store.state.userToken,
    }
  });
}
