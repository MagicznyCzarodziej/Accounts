import Api from '@/services/Api';

async function secret() {
  return await Api().get('secret');
}

export default {
  secret,
};
