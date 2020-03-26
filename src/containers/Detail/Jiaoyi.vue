<template>
  <!-- 交易动态 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>交易动态</span>
      <div style="float:right">
        <el-tooltip
          class="item"
          effect="dark"
          content="设定你想买入和卖出的价格，系统会为你寻找合适的交易对象"
          placement="top"
        >
          <el-button round @click="dialogFormVisible = true" size="small" type="primary">
            <i class="el-icon-goods"></i>买卖股份
          </el-button>
        </el-tooltip>
      </div>

      <el-dialog title="挂单交易" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item label="方向" :label-width="formLabelWidth">
            <el-radio-group v-model="form.radio">
              <el-radio-button label="买入"></el-radio-button>
              <el-radio-button label="卖出"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- tip最少交易100股 -->
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input-number v-model="form.amount" :min="100"></el-input-number>
          </el-form-item>
          <!-- 最低价格为1援力 -->
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input-number v-model="form.price" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="原因" :label-width="formLabelWidth">
            <el-input v-model="form.reason" autocomplete="off" placeholder="我永远喜欢艾拉"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlemm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="color:red;margin-bottom:20px">买方</div>
    <div v-for="(item,index) in buyInfo" :key="2*index">
      <span>{{item.user.name}} 想以{{item.price/100}}援力每股的单价，买入 {{item.amount}}（{{item['finished_amount']}}） 股</span>
      <span style="color:gray;float:right">{{todate(item['created_at'])}}</span>
    </div>
    <div style="color:green;margin-bottom:20px;margin-top:20px">卖方</div>
    <div v-for="(item,index) in saleInfo" :key="2*index+1">
      <span>{{item.user.name}} 想以{{item.price/100}}援力每股的单价，卖出 {{Math.abs(item.amount)}}（{{item['finished_amount']}}） 股</span>
      <span style="color:gray;float:right">{{todate(item['created_at'])}}</span>
    </div>
  </el-card>
</template>
<script>
import {
  apiStocks,
  apiDealsStatus,
  // apiMyOrdersdeal,
  apiMyOrdersPost
} from "@/request/api";
import { Bus } from "@/util/bus.js";

export default {
  name: "Jiaoyi",

  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        radio: "",
        price: "",
        amount: "",
        reason: ""
      },

      num: 100,
      price: 1,

      formLabelWidth: "120px",

      saleInfo: "",
      buyInfo: "",
      code: ""
    };
  },
  mounted() {

    this.code = this.$route.query.code;
    this.getSaleAndBuyInfo(this.code);
    let vm = this
    Bus.$on('getSaleAndBuyInfo',function(code){
        vm.getSaleAndBuyInfo(code)
    })
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

    //获取交易动态
    getSaleAndBuyInfo(code) {
      apiDealsStatus({
        code,
        type: "sale",
        status: "padding"
      })
        .then(res => {
        //   console.log(res, "交易动态salesale");
          this.saleInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      apiDealsStatus({
        code,
        type: "buy",
        status: "padding"
      })
        .then(res => {
        //   console.log(res, "交易动态buybuy");
          this.buyInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handlemm() {
      //处理买卖股份
      this.dialogFormVisible = false;
    //   console.log(this.form);
      if (this.form.radio == "卖出") {
        this.form.amount = -this.form.amount;
      }
      let formdata = {
        code: this.code,
        price: this.form.price * 100,
        amount: this.form.amount,
        detail: {
          reason: this.form.reason
        }
      };
    //   console.log(formdata);
      apiMyOrdersPost(formdata)
        .then(res => {
        //   console.log(res);
          if (res.success) {
            this.$message({
              message: res.msg,
              type: "success"
            });

            this.getSaleAndBuyInfo(this.code);
             Bus.$emit('getStockInfoWithMe',this.code)
              Bus.$emit('getMydeals',this.code)
            // this.getStockInfoWithMe(this.code);//需要去告诉兄弟组件去触发TODO+
            // this.getMydeals(this.code)//需要去告诉兄弟组件去触发TODO+
          } else if (res.error) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
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