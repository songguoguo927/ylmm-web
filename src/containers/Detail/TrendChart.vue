<template>
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
</template>
<script>
import LineChart from "../LineChart.js";

import { apiTrendsget } from "@/request/api";
export default {
  name: "TrendChart",
  components: {
    LineChart
  },
  data() {
    return {
      wishTitle: "许愿",
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
      chartType: "按小时",
      trendsData: "hour_close",
      trendType: "",
      code: ""
    };
  },
  mounted() {
    this.code = this.$route.query.code;

    this.getTrendsData(this.code, this.trendType);
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
    //获取趋势图数据
    getTrendsData(code, trend_type) {
      apiTrendsget({ code, trend_type, limit: 80 })
        .then(res => {
          console.log(res, "趋势图数据展示------------------");
          this.chartData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    chartTypechange(e) {
      if (e == "按天") {
        this.chartData = this.chartData2;
        this.trendType = "day_close";
        this.getTrendsData(this.code, this.trendType);
      } else {
        this.trendType = "hour_close";
        this.chartData = this.chartData1;
      }
    }

    // fillData() {
    //   this.datacollection = {
    //     labels: [this.getRandomInt(), this.getRandomInt()],
    //     datasets: [
    //       {
    //         label: "Data One",
    //         backgroundColor: "#f87979",
    //         data: [this.getRandomInt(), this.getRandomInt()]
    //       }
    //     ]
    //   };
    // },
    // getRandomInt() {
    //   return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../Detail.scss";
</style>