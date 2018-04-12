import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: require('@/components/LoginPage').default,
    },
    {
      path: '/home',
      name: 'home-page',
      component: require('@/components/HomePage').default,
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
      path: '/blockChain',
      name: 'block-chain',
      component: require('@/components/BlockChain').default,
    },
    {
      path: '/chart',
      name: 'chart-page',
      component: require('@/components/ChartPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
