<template>
  <div class="container">
    <MHeader />
    <router-view></router-view>
    <!-- <MFooter /> -->
  </div>
</template>
<script>
import MHeader from './containers/Layout/Header.vue'
import MFooter from './containers/Layout/Footer.vue'
export default {
  name:'App',
   components:{
    MHeader,
    MFooter,
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


