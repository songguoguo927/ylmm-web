<template>
  <!-- 与我相关 -->

  <el-card class="box-card" v-if="$store.state.isLogin">
    <div slot="header" class="clearfix">
      <span>与我相关</span>
      <div style="float:right">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleSwitch"
        ></el-switch>
        <span v-if="value">取消</span>
        <span v-else>特别</span>
        <span>关注</span>
      </div>
    </div>
    <div>我持有 {{myInfo['stock_balance']}} 股和 {{myInfo.balance/100}} 援力</div>
    <div v-if="mydealInfo">
      <h4 style="margin-top:20px;margin-bottom:20px">我的交易</h4>
      <div v-for="(item,index) in mydealInfo" :key="index" style="margin-top:20px">
        以 {{item.price/100}} 援力的价格
        <span v-if="item.amount>0" style="color:red">买入</span>
        <span v-else style="color:green">卖出</span>
        （{{item['finished_amount']}}/{{Math.abs(item.amount)}}） 股
        <el-button size="mini" type="danger" @click="handleDelete(item.id)" style="float:right">取消</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import Z from "@/util/localStorage.js";

import {
  apiStocksMy,
  apiStocksSelect,
  apiStocksDeSelect,
  apiMyOrders,
  apiMyOrdersCancel
} from "@/request/api";
export default {
  name: "AboutMe",
  data() {
    return {
      value: false,
      myInfo: "",
      mydealInfo: "",
      code: ""
    };
  },
  mounted() {
    this.code = this.$route.query.code;
    if (Z.getStorage("token") || this.$store.state.isLogin) {
      console.log("--------登录就发起下面的请求");
      this.getStockInfoWithMe(this.code);
      this.getMydeals(this.code);
    }
  },
  computed: {},
  methods: {
    handleDelete(id) {
      apiMyOrdersCancel(id)
        .then(res => {
          console.log(res, "cancel");
          this.getMydeals(this.code);
          //   this.getSaleAndBuyInfo(this.code)//需要去告诉兄弟组件去触发TODO
          this.getStockInfoWithMe(this.code);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //获取与我相关-我的交易
    getMydeals(code) {
      apiMyOrders({ code, status: "padding" })
        .then(res => {
          console.log(res, "与我相关-我的交易------------------");
          this.mydealInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //与我相关的信息
    getStockInfoWithMe(code) {
      apiStocksMy(code)
        .then(res => {
          console.log(res, "与我相关的信息-----iiiii");
          this.myInfo = res;
          this.value = res.selected;
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSwitch(v) {
      console.log(v);
      if (v) {
        apiStocksSelect(this.$route.params.code)
          .then(res => {
            console.log(res);
            this.value = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        apiStocksDeSelect(this.$route.params.code)
          .then(res => {
            console.log(res);
            this.value = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../Detail.scss";
</style>