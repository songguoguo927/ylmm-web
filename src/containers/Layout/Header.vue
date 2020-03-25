<template>
  <div class="lunbo">
    <div style="flex:1">
      <img src="@/assets/favicon.png" alt="" style="height: 80%;border-radius: 5px;margin-top:7px">
    </div>
    <div class="lunbo-title">
      <p>恭喜你 发现一枚宝 愿你不枉此行</p>
    </div>
    <div style="flex:1" class="avatar">
      <el-avatar>{{avatarName}}</el-avatar>
    </div>
    <div v-if="!isLogin">
      <el-link type="primary"><router-link to="login" style="color:skyblue">登录</router-link></el-link>
      <el-link type="primary"><router-link to="signup" style="color:skyblue">注册</router-link></el-link>
    </div>
    <div v-else style="cursor:pointer" @click="logout">
      <el-link type="primary" style="color:skyblue">登出</el-link>
    </div>
  </div>
</template>
<script>
import { apiUser,apiLogout } from "@/request/api";
import Z from "@/util/localStorage.js";

export default {
  name: "header",
  data() {
    return {
      // userinfo: "未登"
      // username:''
    };
  },
  computed:{
    avatarName:{
      get(){
        return this.$store.state.avatarName
      },
      set(v){
        this.$store.commit('setAvatarName',v)
      }
    },
    isLogin:{
      get(){
        return this.$store.state.isLogin
        },
      set(v){
        this.$store.commit('changeIsLogin',v)
      }
    }
  },
  methods: {
    logout(){
      console.log(11111) 
       this.$router.push('/') //登出跳转 如果在login登出跳转至login会报错
        this.isLogin = false
        this.avatarName = null
        Z.removeStorage('token') 
      apiLogout().then((res)=>{   
             
        console.log(res,'logout')
      }).catch(err=>{
        console.log(err)
      })
    },
    getMyselfInfo() {
      apiUser()
        .then(res => {
          //加了token就是自己的user信息
          console.log(res);
          // this.username = res.name.slice(0, 3);
          if(res.name){
            this.isLogin=true
           this.avatarName=res.name.slice(0,3)
           this.$store.commit('setwalletAddress',res.address)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    if (Z.getStorage("token")) {
      this.getMyselfInfo();
    }
  }
};
</script>
<style lang="scss" scoped>
.lunbo {
  padding-left: 20px;
  padding-right: 20px;
  // min-width: 378px;
  display: inline-flex;
  width: 100%;
  background-size: cover;
  height: 60px;
  line-height: 60px;
  color: #fff;
  // text-align: center;
  font-weight: 600;
  position: relative;
  background: rebeccapurple;
  opacity: 0.8;
}
.lunbo-title {
  flex: 3;
  // display: inline-block;
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
}
.avatar {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 10px;
}
</style>