<template>
  <div style="">    
    <!--mode="horizontal"-->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/"><span class="iconfont icon-shouye"></span>援力满满（Beta）</el-menu-item>
      <el-menu-item index="/rank"><span class="iconfont icon-rank"></span>援力排行</el-menu-item>
      <el-menu-item index="/help"><span class="iconfont icon-help"></span>帮助与玩法</el-menu-item>
      <el-menu-item index="/post"><span class="iconfont icon-postitpencil"></span>运营公告</el-menu-item>
      <el-submenu index="2" v-if='$store.state.isLogin'>
        <!-- 已登录 -->
        <template slot="title"><span class="iconfont icon-user"></span>与我相关</template>
        <el-menu-item index="/profile">资产列表</el-menu-item>
        <el-menu-item index="/orders">挂单列表</el-menu-item>
        <el-menu-item index="/deals">交易列表</el-menu-item>
        <!-- <el-menu-item index="logout">登出</el-menu-item> -->
      </el-submenu>
      <!--未登录 <el-submenu index="6">      
        <template slot="title"><span class="iconfont icon-user"></span>用户中心</template>
        <el-menu-item index="login">登录</el-menu-item>
        <el-menu-item index="signup">注册</el-menu-item>
      </el-submenu> -->
    </el-menu>
    <div style="margin-top: 124px;">
      <img width="100%" src="@/assets/menuBg.jpg" alt="">
      <!-- <img width="100%" src="@/assets/menuBg2.jpg" alt=""> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "menu",
  data() {
    return {
      activeIndex: "/",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
ul.el-menu-demo{
  // padding-left:30px;
}
.iconfont{
  margin-right: 10px;
  vertical-align: baseline
}
</style>