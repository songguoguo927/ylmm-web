import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home.vue'
import Z from '@/util/localStorage'
import NotFound from '@/containers/components/NotFound.vue'

Vue.use(Router)
function check_is_login(){
  // console.log(!!Z.getStorage('token'),'checkis login')
    return Z.getStorage('token')
}
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)

}
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
        component: () => import('@/containers/Rank.vue'),
        // meta: { allowBack: false }
      },
      {
        path: '/help',
        name: 'Help',
        component: () => import('@/containers/Help.vue'),
        // meta: { allowBack: false }
      },
      {
        path: '/post',
        name: 'Post',
        component: () => import('@/containers/Post.vue'),
        // meta: { allowBack: false }
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/containers/Detail.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => 
          check_is_login() ? NotFound : import('@/containers/components/Login.vue')
        
      },
      // {
      //   path: '/logout',
      //   name: 'Logout',
      //   component: () => import('@/containers/components/Login.vue')
      // },
      {
        path: '/signup',
        name: 'Signup',
        component: 
        () =>  import('@/containers/components/Signup.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: 
        () => import('@/containers/components/Profile.vue')
      },
      {
        path: '/orders',
        name: 'Order',
        component: () => 
        import('@/containers/components/Order.vue')
      },
      {
        path: '/deals',
        name: 'Deals',
        component: () => 
        import('@/containers/components/Deals.vue')
      },
      {
        path:'/showallstocks',
        name:'ShowAllStocks',component: () => 
        import('@/containers/Admin/ShowAllStocks.vue')
      },
      {
        path:'/showallusers',
        name:'ShowAllUsers',component: () => 
        import('@/containers/Admin/ShowAllUsers.vue')
      }
  ]
})
