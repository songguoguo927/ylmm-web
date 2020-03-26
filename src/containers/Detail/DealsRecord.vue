<template>
  <!-- 成交记录 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>成交记录</span>
    </div>
    <div v-for="(item,index) in chengjiaoInfo" :key="index">
      <span>以 {{item.price/100}} 股 成交 {{item.amount}} 股</span>
      <span style="color:gray;float:right">{{todate(item['created_at'])}}</span>
    </div>
  </el-card>
</template>
<script>
import { apiDeals } from "@/request/api";
export default {
  name: "DealsRecord",
  data() {
    return {
      chengjiaoInfo: "",
      code: ""
    };
  },
  // prop:['code'],
  mounted() {
    this.code = this.$route.query.code;
    this.getchengjiaoInfo(this.code);
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
    //获取成交记录
    getchengjiaoInfo(code) {
      apiDeals({ code })
        .then(res => {
          // console.log(res, "成交记录------------");
          this.chengjiaoInfo = res.data;
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