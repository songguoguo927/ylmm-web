import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// import {apiSuperWishes} from '@/request/api'

export default new Vuex.Store({
    state: {
      count: 1,
      // token:'a8ZTTSl1tgpKttxgNBMag6lagTF2URAV',
      menulist: [
        { path: "/one", title: "援力满满（Beta)", exact: false, component: "" },
        { path: "/ranking", title: "援力排行", exact: false, component: "" },
        { path: "/help", title: "帮助与玩法", exact: false, component: "" },
        { path: "/post", title: "运营公告", exact: true, component: "" },
        { path: "/user", title: "用户中心", exact: true, component: "" }
      ],
      isLogin:false,
      avatarName:null,
      // hard:''
      walletAddress:''
    },
    
    mutations: {
      changeIsLogin (state,paylod) {
        state.isLogin = paylod
      },
      setAvatarName(state,paylod){
        state.avatarName = paylod
      },
      setwalletAddress(state,paylod){
        state.walletAddress = paylod
      },
      // dataPostHard(state,paylod){
      //   state.hard = payload
      // }
    },
    actions:{
      // apiSuperWishesGet({commit}){
      //   apiSuperWishes().then(res=>{
      //     console.log(res,'vuex superwishes')
      //     commit('dataPostHard',res.hard)
      //   }).catch(err=>{
      //     console.log(err)
      //   })
      // }
    }
  })
