<template>
  <div style="">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/">援力满满（Beta）</el-menu-item>
      <el-menu-item index="/rank">援力排行</el-menu-item>
      <el-menu-item index="/help">帮助与玩法</el-menu-item>
      <el-menu-item index="/post">运营公告</el-menu-item>
      <el-submenu index="2">
        <!-- 已登录 -->
        <template slot="title">用户名称</template>
        <el-menu-item index="/profile">资产列表</el-menu-item>
        <el-menu-item index="/orders">挂单列表</el-menu-item>
        <el-menu-item index="/deals">交易列表</el-menu-item>
        <el-menu-item index="logout">登出</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <!-- 未登录 -->
        <template slot="title">用户中心</template>
        <el-menu-item index="login">登录</el-menu-item>
        <el-menu-item index="signup">注册</el-menu-item>
      </el-submenu>
    </el-menu>
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
      // console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
ul.el-menu-demo{
  padding-left:30px;
}
</style>