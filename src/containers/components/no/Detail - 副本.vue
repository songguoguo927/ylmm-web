<template>
  <div style="margin:30px">
    <el-row :gutter="20">
      <el-col :md="18" :xs="24">
        <el-card class="box-card">
          <div>
            <span>{{stockInfo.name}}</span>
            <span style="margin-left: 6px;font-size: 12px;color: #c0c4cc;">{{stockInfo.code}}</span>
            <div style="float:right">
              <el-tooltip class="item" effect="dark" content="为 Ta 加油，就有机会抽取一定数量的萌股哟" placement="top">
                <el-button round size="small" @click="dialogForm2Visible = true"><i class="el-icon-star-on"></i>许愿</el-button>
              </el-tooltip>
              
            </div>
            <el-dialog :title="wishTitle" :visible.sync="dialogForm2Visible" center  width="30%">
              <el-form :model="form2">
                <el-form-item label="">
                  <el-input v-model="form2.reason" autocomplete="off" placeholder="我永远喜欢艾拉"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm2Visible = false">取 消</el-button>
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
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>行情走势</span>
          </div>
          <!--一个数据图 -->
          <el-radio-group v-model="chartType" @change="chartTypechange">
            <el-radio-button label="按小时"></el-radio-button>
            <el-radio-button label="按天"></el-radio-button>
          </el-radio-group>
          <div class="small">
            <line-chart :chartData="chartData" :options="chartOptions" :styles="myStyles"></line-chart>
            <!-- <line-chart></line-chart> -->
          </div>
        </el-card>
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
              <div v-for="(item,index) in mydealInfo" :key='index'  style="margin-top:20px">以 {{item.price/100}} 援力的价格
                <span v-if="item.amount>0" style="color:red">买入</span><span v-else style="color:green">卖出</span> 
                （{{item['finished_amount']}}/{{Math.abs(item.amount)}}） 股
                <el-button               
                    size="mini"
                    type="danger"
                    @click="handleDelete(item.id)"
                    style="float:right"
                  >取消</el-button></div>
            </div>
            
        </el-card>
        <!-- 交易动态 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>交易动态</span>
            <div style="float:right">
              <el-tooltip class="item" effect="dark" content="设定你想买入和卖出的价格，系统会为你寻找合适的交易对象" placement="top">
                <el-button round @click="dialogFormVisible = true" size="small" type="primary"><i class="el-icon-goods"></i>买卖股份</el-button>
              </el-tooltip>
              
            </div>

            <el-dialog title="挂单交易" :visible.sync="dialogFormVisible" center>
              <el-form :model="form">
                <el-form-item label="方向" :label-width="formLabelWidth">
                  <!-- @change="fxchange" -->
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
          <div v-for="(item,index) in buyInfo" :key="index">
            <span>{{item.user.name}} 想以{{item.price/100}}援力每股的单价，买入 {{item.amount}}（{{item['finished_amount']}}） 股</span>
            <span style="color:gray;float:right">{{todate(item['created_at'])}}</span>
          </div>
          <div style="color:green;margin-bottom:20px;margin-top:20px">卖方</div>
          <div v-for="(item,index) in saleInfo" :key="index">
            <span>{{item.user.name}} 想以{{item.price/100}}援力每股的单价，卖出 {{Math.abs(item.amount)}}（{{item['finished_amount']}}） 股</span>
            <span style="color:gray;float:right">{{todate(item['created_at'])}}</span>
          </div>
        </el-card>
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
      </el-col>
      <el-col :md="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色作品</span>
          </div>
          <!-- 音乐or作品说明 -->
          <div>
            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=86 :src="stockInfo['music_link']"></iframe>
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

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>应援动态</span>
          </div>
          <divv v-for="(item,index) in yingyuandongtaiInfo" :key="index">
            {{item.user.name}}抽到了<span v-if="item.amount">{{item.amount}}股</span><span v-else>援力</span> <span>（几秒内）</span>
          </divv>
        </el-card>

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
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import todate from '@/util/format.js'
import LineChart from "./LineChart.js";
import Dynamic from "./components/Dynamic.vue";
import Z from '@/util/localStorage.js'

import {
  apiStocks,
  apiStocksHoldingRank,
  apiDealsStatus,
  apiMyDeals,
  apiStocksMy,
  apiStocksSelect,
  apiStocksDeSelect,
  // apiMyOrdersdeal,
  apiMyOrdersPost,
  apiMyOrders,
  apiMyOrdersCancel,
  apiWishs,
  apiWishsget,
  apiTrendsget
} from "@/request/api";
export default {
  name: "Detail",
  components: {
    LineChart,
    Dynamic
  },
  data() {
    return {
      wishTitle:'许愿',
      value: false,
      chartData1: {
        //按小时的数据
        labels: ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00"],
        datasets: [
          {
            label: "1H",
            backgroundColor: "rgba(102,52,153,0.5)",
            data: [10, 20, 30, 40, 50, 60]
          }
        ]
      },
      chartData2: {
        //按天的数据
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            label: "1D",
            backgroundColor: "rgba(102,52,153,0.5)",
            data: [10, 20, 30, 40, 50, 60, 70]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      dialogFormVisible: false,
      dialogForm2Visible:false,
      dialogVisible: false,
      radio1: "上海",
      form: {
        radio: "",
        price: "",
        amount: "",
        reason: ""
      },
      form2:{//许愿表单喊话
        reason:''
      },
      num: 100,
      price: 1,
      chartType: "按小时",
      formLabelWidth: "120px",
      height: 300,
      stockInfo: "",
      houbuInfo: "",
      saleInfo: "",
      buyInfo: "",
      chengjiaoInfo: "",
      myInfo: "",
      mydealInfo: "",
      code:'',
      yingyuandongtaiInfo:'',
      trendsData:'hour_close',
      trendType:''
    };
  },
  mounted() {
    // this.fillData();
    // this.code = this.$route.params.code;
    this.code = this.$route.query.code;
    this.getStockInfo(this.code);
    this.getHoubuInfo(this.code);
    this.getSaleAndBuyInfo(this.code);
    this.getLoverPower(this.code);
    this.getTrendsData(this.code,this.trendType)
    if (Z.getStorage("token")||this.$store.state.isLogin) {
      console.log('--------登录就发起下面的请求')
      this.getStockInfoWithMe(this.code);
      this.getMydeals(this.code)
    }
  },
  computed: {
    // code(){
    //   return this.$route.params.code
    // },
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative"
      };
    },
    chartData: {
      get() {
        if (this.chartType == "按天") {
          return this.chartData2;
        } else {
          return this.chartData1;
        }
      },
      set() {}
    }
  },
  methods: {
    addZero(obj){
      if(obj<10) return "0" +""+ obj;
        else return obj;
    },
    todate(inputstr) {
      //Wed, 25 Mar 2020 15:56:03 +0800  2020-03-25 15:31:43
       var d = new Date(inputstr) 
        let youWant=d.getFullYear() + '-' + this.addZero(d.getMonth() + 1) + '-' + this.addZero(d.getDate()) + ' ' + this.addZero(d.getHours())
         + ':' + this.addZero(d.getMinutes()) + ':' + this.addZero(d.getSeconds()); 
        return youWant;
    },
    handleDelete(id) {
      apiMyOrdersCancel(id)
        .then(res => {
          console.log(res, "cancel");
          this.getMydeals(this.code)
          this.getSaleAndBuyInfo(this.code)
          this.getStockInfoWithMe(this.code)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取趋势图数据
    getTrendsData(code,trend_type){
      apiTrendsget({code,trend_type,limit:80}).then(res => {
          console.log(res,'趋势图数据展示------------------');
          this.chartData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取与我相关-我的交易
    getMydeals(code) {
      apiMyOrders({ code, status: "padding" })
        .then(res => {
          console.log(res,'与我相关-我的交易------------------');
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
          console.log(res,'与我相关的信息-----iiiii');
          this.myInfo = res;
          this.value = res.selected;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getStockInfo(code) {
      apiStocks(code)
        .then(res => {
          console.log(res,'StockInfo------------');
          this.stockInfo = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取成交记录
    getchengjiaoInfo(code) {
      apiMyDeals({ code })
        .then(res => {
          console.log(res,'成交记录------------');
          this.chengjiaoInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取交易动态
    getSaleAndBuyInfo(code) {
      apiDealsStatus({
        code,
        type: "sale",
        status: "padding"
      })
        .then(res => {
          console.log(res,'交易动态salesale');
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
          console.log(res,'交易动态buybuy');
          this.buyInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取候补排位
    getHoubuInfo(code) {
      apiStocksHoldingRank(code)
        .then(res => {
          console.log(res,'候补排位');
          this.houbuInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取应援动态 res
    //{"count":1,"data":[
      // {"id":25753487,
      // "user":{"id":1496,"name":"jiam927","nick_name":"jiam927","balance":1359294,"address":"aIX8ePap9CVsZ2Gm9d3uR35K3bDdCt8IEs","wish_count":2,"wish_limit":100},
      //"amount":78,
      //"detail":{"cheer_word":"我我我","love_power":77744178430},"created_at":"Wed, 25 Mar 2020 20:34:08 +0800"}]}
    getLoverPower(code){
      apiWishsget({code}).then(res=>{
          console.log(res,'应援动态')
          this.yingyuandongtaiInfo = res.data
        }).catch(err => {
          console.log(err);
        });
    },
    handlemm2(){//处理提交许愿喊话
      // this.dialogForm2Visible = false;
      console.log(this.form2);
      apiWishs({
        code:this.code,
        lover_power:88230032862,//搞清楚这个从哪里来TODO
        cheer_word:this.form2.reason
      }).then(res=>{
        if(res.success){
          console.log(res)
        // {"success":true,"hard":13,"type":"coin","amount":204464}
        this.wishTitle = '获得了'+res.amount/100+'点援力'
        // this.getStockInfoWithMe(this.code)
        apiStocksMy(this.code) //抽到援例/股 去更新与我相关
        .then(res => {
          this.myInfo = res;
          this.value = res.selected;
          let y = res['wish_count']
          let rest = res['wish_limit']-y
          this.$message({
            message:'已经许愿'+y+'次，还剩'+rest+'次',
            type:'success'
          })        //{"balance":1359294,"stock_balance":0,"wish_count":1,"wish_limit":100,"selected":true}

        })
        .catch(err => {
          console.log(err);
        });
        // apiMyOrdersdeal({code:this.code,status:'padding'}).then(res=>{//去更新我的交易
        //   console.log(res)
        // }).catch(err => {
        //   console.log(err);
        // });
        this.getMydeals(this.code)//去更新我的交易
        this.getLoverPower(this.code)//去更新应援动态
        }else{
          this.$message({
            message:res.msg,
            type:'error'
          })
        }
        }).catch(err=>{
        console.log(err)
      })
      
    },
    handlemm() {
      //处理买卖股份
      this.dialogFormVisible = false;
      console.log(this.form);
      if (this.form.radio == "卖出") {
        this.form.amount = -this.form.amount;
      }
      let formdata = {
        code: this.$route.params.code,
        price: this.form.price * 100,
        amount: this.form.amount,
        detail: {
          reason: this.form.reason
        }
      };
      console.log(formdata);
      apiMyOrdersPost(formdata)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: res.msg,
              type:'success'
            });
            
            this.getSaleAndBuyInfo(this.code);
            this.getStockInfoWithMe(this.code);
            this.getMydeals(this.code)
          }
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
    },
    chartTypechange(e) {
      if (e == "按天") {
        this.chartData = this.chartData2;
        this.trendType = 'day_close'
        this.getTrendsData(this.code,this.trendType)
      } else {
        this.trendType = 'hour_close'
        this.chartData = this.chartData1;
      }
    },
    fxchange() {},
    handleChange(value) {
      console.log(value);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style lang="scss" scoped>
.small {
  max-width: 600px;
  margin: 20px auto;
}
.el-card {
  margin-bottom: 18px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>