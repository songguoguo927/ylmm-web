<template>
  <!-- 现任老婆/候补排位 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>现任老婆</span>
      </div>
      <div v-if="houbuInfo[0]">{{houbuInfo[0].user}} 持有 {{houbuInfo[0].balance}} 股</div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>候补排位</span>
      </div>
      <div v-for="(item,index) in houbuInfo" :key="index">{{item.user}} 持有 {{item.balance}} 股</div>
    </el-card>
  </div>
</template>
<script>
import { apiStocksHoldingRank } from "@/request/api";
export default {
  name: "Houbu",
  data() {
    return {
      houbuInfo: "",
      code: ""
    };
  },
  // prop:['code'],

  mounted() {
    this.code = this.$route.query.code;

    this.getHoubuInfo(this.code);
  },
  computed: {},
  methods: {
    addZero(obj) {
      if (obj < 10) return "0" + "" + obj;
      else return obj;
    },
    todate(inputstr) {
      //Wed, 25 Mar 2020 15:56:03 +0800  2020-03-25 15:31:43
      var d = new Date(inputstr);
      let youWant =
        d.getFullYear() +
        "-" +
        this.addZero(d.getMonth() + 1) +
        "-" +
        this.addZero(d.getDate()) +
        " " +
        this.addZero(d.getHours()) +
        ":" +
        this.addZero(d.getMinutes()) +
        ":" +
        this.addZero(d.getSeconds());
      return youWant;
    },
    //获取候补排位
    getHoubuInfo(code) {
      apiStocksHoldingRank(code)
        .then(res => {
          // console.log(res, "候补排位");
          this.houbuInfo = res.data;
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