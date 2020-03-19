<template>
  <div style="margin:30px">
    Detail
    {{$route.query.id}}
    <el-row :gutter="20">
      <el-col :md="18" :xs="24">
        <el-card class="box-card">
          <div>
            <span>艾拉ISLA</span>
            <span>
              <el-button round>许愿</el-button>
            </span>
          </div>
          <!-- TODO数字显示做成动态的 -->
          <div>
            62617.00
            <span>+31208.50%</span>
          </div>
          <div>总市值: 107,413,577,502</div>
          <div>总股份: 1,715,406</div>
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
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>与我相关</span>
          </div>
          <div>我持有 many1 股和 many2 援力</div>
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <span v-if="value">取消</span>
          <span v-else>特别</span>
          <span>关注</span>
        </el-card>
        <!-- 交易动态 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>交易动态</span>
            <el-button round @click="dialogFormVisible = true">买卖股份</el-button>
            <el-dialog title="挂单交易" :visible.sync="dialogFormVisible" center>
              <el-form :model="form">
                <el-form-item label="方向" :label-width="formLabelWidth">
                  <el-radio-group v-model="radio1" @change="fxchange">
                    <el-radio-button label="买入"></el-radio-button>
                    <el-radio-button label="卖出"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <!-- tip最少交易100股 -->
                <el-form-item label="数量" :label-width="formLabelWidth">
                  <el-input-number v-model="num" @change="handleChange" :min="100" label="描述文字"></el-input-number>
                </el-form-item>
                <!-- 最低价格为1援力 -->
                <el-form-item label="价格" :label-width="formLabelWidth">
                  <el-input-number v-model="price" @change="handleChange" :min="1" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="原因" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off" placeholder="我永远喜欢艾拉"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div style="color:red">买方</div>
          <div>--------</div>
          <div style="color:green">卖方</div>
          <div>--------</div>
        </el-card>
        <!-- 成交记录 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>成交记录</span>
          </div>
          <div>以 many 股 成交 100 股</div>
          <div>以 many 股 成交 100 股</div>
          <div>以 many 股 成交 100 股</div>
          <div>以 many 股 成交 100 股</div>
        </el-card>
      </el-col>
      <el-col :md="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色作品</span>
          </div>
          <!-- TODO数字显示做成动态的 -->
          <!-- 音乐or作品说明 -->
          <div>作品说明</div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标签</span>
          </div>
          <el-tag>标签一</el-tag>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>应援动态</span>
          </div>
          <div>应援动态</div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>现任老婆</span>
          </div>
          <div>who 持有 many 股</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>候补排位</span>
          </div>
          <div>who 持有 many 股</div>
          <div>who 持有 many 股</div>
          <div>who 持有 many 股</div>
          <div>who 持有 many 股</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineChart from "./LineChart.js";
export default {
  name: "Detail",
  components: {
    LineChart
  },
  data() {
    return {
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
      dialogVisible: false,
      radio1: "上海",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: ""
      },
      num: 100,
      price: 1,
      chartType: "按小时",
      formLabelWidth: "120px",
      height: 300
    };
  },
  mounted() {
    // this.fillData();
  },
  computed: {
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
    chartTypechange(e) {
      if (e == "按天") {
        this.chartData = this.chartData2;
      } else {
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