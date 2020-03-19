<template>
  <div class="container">
    <MHeader />
    <el-row>
      <el-col :sm="24" :md="4"><Menu /></el-col>
      <el-col :sm="24" :md="20"><router-view></router-view></el-col>
    </el-row>
    
    <!-- <MFooter /> -->
  </div>
</template>
<script>
import MHeader from './containers/Layout/Header.vue'
import MFooter from './containers/Layout/Footer.vue'
import Menu from "./containers/Layout/components/Menu.vue";

export default {
  name:'App',
   components:{
    MHeader,
    MFooter,
    Menu
  }, 
  watch:{
    // $route:function(n,o){
    //   console.log(n,o,'app')
    // }
  }
}
</script>
<style lang="css" scoped>
.container{
  
  
}
</style>


