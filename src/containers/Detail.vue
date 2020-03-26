<template>
  <div style="margin:30px">
    <el-row :gutter="20">
      <el-col :md="18" :xs="24">
        <el-card class="box-card">
          <div>
            <span>{{stockInfo.name}}</span>
            <span style="margin-left: 6px;font-size: 12px;color: #c0c4cc;">{{stockInfo.code}}</span>
            <div style="float:right">
              <el-tooltip
                class="item"
                effect="dark"
                content="为 Ta 加油，就有机会抽取一定数量的萌股哟"
                placement="top"
              >
                <el-button round size="small" @click="dialogForm2Visible = true">
                  <i class="el-icon-star-on"></i>许愿
                </el-button>
              </el-tooltip>
            </div>
            <el-dialog :title="wishTitle" :visible.sync="dialogForm2Visible" center width="30%">
              <el-form :model="form2">
                <el-form-item label>
                  <el-input v-model="form2.reason" autocomplete="off" placeholder="我永远喜欢艾拉"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogForm2Visible = false">取 消</el-button> -->
                <el-button type="primary" @click="handlemm2">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div style="margin-top:30px;display:inline-block">
            <Dynamic
              v-if="stockInfo.price"
              :startVal="0"
              :endVal="(stockInfo.price/100)"
              :speed="8000"
              :decimals="2"
              :isReverse="false"
            />
            <span v-else style="font-size:40px">0</span>
            <span style="margin-left:10px;font-size:18px;color:#f56c6c">+31208.50%</span>
          </div>
          <div style="margin-top:30px;float:right">
            <p>总市值: {{stockInfo.price*stockInfo['total_share']/100}}</p>
            <p>总股份: {{stockInfo['total_share']}}</p>
          </div>
        </el-card>
        <!-- 行情走势 -->
        <TrendChart />
        <!-- 与我相关 -->
        <AboutMe ref="aboutme"/>
        <!-- 交易动态 -->
        <jiaoyi />
        <!-- 成交记录 -->
        <DealsRecord />
      </el-col>
      <el-col :md="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色作品</span>
          </div>
          <!-- 音乐or作品说明 暂时隐藏 -->
          <div>
            <!-- <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=86 :src="stockInfo['music_link']"></iframe> -->
          </div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标签</span>
          </div>
          <el-tag
            v-for="(item,index) in stockInfo.tags"
            :key="index"
            style="margin-right:10px;margin-bottom:10px"
          >{{item}}</el-tag>
        </el-card>

        <!-- 应援动态-->
        <YyActive ref="yyActive"/>

        <Houbu />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Dynamic from "./components/Dynamic.vue";
import TrendChart from "./Detail/TrendChart.vue";
import DealsRecord from "./Detail/DealsRecord.vue";
import Houbu from "./Detail/Houbu.vue";
import YyActive from "./Detail/YyActive.vue";
import AboutMe from "./Detail/AboutMe.vue";
import Jiaoyi from "./Detail/Jiaoyi.vue";
import { Bus } from "@/util/bus.js";
import {
  apiStocks,
  apiWishs
  // apiWishsget,
} from "@/request/api";
export default {
  name: "Detail",
  components: {
    Dynamic,
    TrendChart,
    DealsRecord,
    Houbu,
    YyActive,
    AboutMe,
    Jiaoyi
  },
  data() {
    return {
      wishTitle: "许愿",
      value: false,
      dialogForm2Visible: false,
      form: {
        radio: "",
        price: "",
        amount: "",
        reason: ""
      },
      form2: {
        //许愿表单喊话
        reason: ""
      },
      num: 100,
      price: 1,

      height: 300,
      stockInfo: "",
      code: ""
    };
  },
  mounted() {
    this.code = this.$route.query.code;
    this.getStockInfo(this.code);
  },
  computed: {},
  methods: {
    getStockInfo(code) {
      apiStocks(code)
        .then(res => {
          // console.log(res, "StockInfo------------");
          this.stockInfo = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    handlemm2() {
      //处理提交许愿喊话--许中了需要更新与我相关-应援动态-我的交易
      // console.log(this.form2);
      apiWishs({
        code: this.code,
        lover_power: 88230032862, //搞清楚这个从哪里来TODO
        cheer_word: this.form2.reason
      })
        .then(res => {
          if (res.success) {
            // console.log(res);
            // {"success":true,"hard":13,"type":"coin","amount":204464}
            //{"success":true,"hard":0,"type":"stock","amount":3}
            this.wishTitle = res.type=='coin' ?  "获得了" + res.amount / 100 + "点援力" : "获得了" + res.amount  + "股票";
            this.$refs.aboutme.getStockInfoWithMe(this.code)
              //告诉子组件去更新数据
              this.$refs.yyActive.getLoverPower(this.code)
              this.$refs.aboutme.getMydeals(this.code); //去更新我的交易
          } else {
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
@import "./Detail.scss";
</style>
