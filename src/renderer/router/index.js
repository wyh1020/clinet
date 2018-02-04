import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/HomePage').default,
    },
    {
      path: '/login',
      name: 'login-page',
      component: require('@/components/LoginPage').default,
    },
    {
      path: '/edit',
      name: 'edit-page',
      component: require('@/components/EditPage').default,
    },
    {
      path: '/stat',
      name: 'stat-page',
      component: require('@/components/StatPage').default,
    },
    {
      path: '/library',
      name: 'library-page',
      component: require('@/components/LibraryPage').default,
    },
    {
      path: '/system',
      name: 'system-page',
      component: require('@/components/SystemPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
