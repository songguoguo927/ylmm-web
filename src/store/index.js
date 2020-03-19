import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      count: 1,
      token:'init',
      menulist: [
        { path: "/one", title: "援力满满（Beta)", exact: false, component: "" },
        { path: "/ranking", title: "援力排行", exact: false, component: "" },
        { path: "/help", title: "帮助与玩法", exact: false, component: "" },
        { path: "/post", title: "运营公告", exact: true, component: "" },
        { path: "/user", title: "用户中心", exact: true, component: "" }
      ]
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })
