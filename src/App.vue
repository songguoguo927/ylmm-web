<template>
  <div class="container">
    <MHeader  :changeIsShowMenu="changeIsShowMenu"/>
    <el-row>
      <el-col :md="4"><Menu :isShowMenu="isShowMenu"/></el-col>
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
  data(){
    return {
      isShowMenu: false,
    }
  },
  mounted(){
    this.checkWindowWidth(window.innerWidth)
    window.onresize = () => {
      this.checkWindowWidth(window.innerWidth)
    };
    // document.onclick = (e)=>{
    //   if(e.clientX>260&&e.clientY>90&&window.innerWidth < 992){
    //      this.isShowMenu&&this.collapsedSider()
    //   }
      
    // }
  },
  methods:{
    checkWindowWidth(screenWidth){
      if (screenWidth >= 992) {
        this.isShowMenu = true
      } else if (screenWidth < 992) {
        // 小于992 默认 先隐藏
        this.isShowMenu = false
      }
    },
    changeIsShowMenu(){
      console.log('2222222222222')
      this.isShowMenu = !this.isShowMenu
    },
    collapsedSider() {
      //   this.$refs.side1.toggleCollapse();
      this.isShowMenu = !this.isShowMenu;
      // 在小于992的屏幕下是隐藏显示，大于等于992的屏幕是旋转图标，并显示是否收缩侧边栏
      if (window.innerWidth < 992) {
        this.$refs.side1.style.display = this.isShowMenu ? "block" : "none";
      }
      if (window.innerWidth >= 992) {
        // this.$refs.side1.style.flex = this.isShowMenu ? 0.5 : 1;
        this.$refs.side1.style.display = "block";
      }
    },
  }
  // watch:{
  //   $route:function(n,o){
  //     console.log(n,o,'app')
  //   }
  // }
}
</script>
<style lang="css" scoped>
.container{
  
  
}
</style>


