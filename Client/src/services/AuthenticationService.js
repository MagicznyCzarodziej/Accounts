import Api from '@/services/Api';

async function register(credentials) {
  return await Api().post('register', credentials);
}

async function login(credentials) {
  return await Api().post('login', credentials);
}

export default {
  register,
  login,
};
