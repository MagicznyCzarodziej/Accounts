import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Register from '@/components/Register';
import Login from '@/components/Login';
import Secret from '@/components/Secret';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/secret',
      name: 'Secret',
      component: Secret,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ]
});
