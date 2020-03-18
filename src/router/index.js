import Vue from 'vue'
import Router from 'vue-router'
import Home from '../containers/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home
    },
      {
        path: '/rank',
        name: 'Rank',
        component: () => import('../containers/Rank.vue'),
        // meta: { allowBack: false }
      },
      {
        path: '/help',
        name: 'Help',
        component: () => import('../containers/Help.vue'),
        // meta: { allowBack: false }
      },
      {
        path: '/post',
        name: 'Post',
        component: () => import('../containers/Post.vue'),
        // meta: { allowBack: false }
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('../containers/Detail.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../containers/components/Login.vue')
      },
      {
        path: '/logout',
        name: 'Logout',
        component: () => import('../containers/components/Login.vue')
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('../containers/components/Signup.vue')
      },
      {
        path: '/profile',
        name: 'AssetsList',
        component: () => import('../containers/components/AssetsList.vue')
      },
      {
        path: '/orders',
        name: 'Order',
        component: () => import('../containers/components/Order.vue')
      },
      {
        path: '/deals',
        name: 'Deals',
        component: () => import('../containers/components/Deals.vue')
      }
  ]
})
