<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>应援动态</span>
    </div>
    <div v-for="(item,index) in yingyuandongtaiInfo" :key="index">
      {{item.user.name}}抽到了
      <span v-if="item.amount">{{item.amount}}股</span>
      <span v-else>援力</span>
      <span>（几秒内）</span>
    </div>
  </el-card>
</template>
<script>
import { apiWishsget } from "@/request/api";
export default {
  name: "YyActive", //角色作品/tags/应用动态
  data() {
    return {
      yingyuandongtaiInfo: "",
      code: ""
    };
  },
  // prop:['code'],
  mounted() {
    this.code = this.$route.query.code;

    this.getLoverPower(this.code);
  },
  computed: {},
  methods: {
    //获取应援动态 res
    //{"count":1,"data":[
    // {"id":25753487,
    // "user":{"id":1496,"name":"jiam927","nick_name":"jiam927","balance":1359294,"address":"aIX8ePap9CVsZ2Gm9d3uR35K3bDdCt8IEs","wish_count":2,"wish_limit":100},
    //"amount":78,
    //"detail":{"cheer_word":"我我我","love_power":77744178430},"created_at":"Wed, 25 Mar 2020 20:34:08 +0800"}]}
    getLoverPower(code) {
      apiWishsget({ code })
        .then(res => {
          // console.log(res, "应援动态");
          this.yingyuandongtaiInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../Detail.scss";
</style>