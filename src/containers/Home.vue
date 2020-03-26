<template>
  <div style="margin:30px">
    <el-row>
      <el-col :sm="24" :md="16">
          <el-radio-group v-model="radio" style="margin-bottom: 20px;" @change="handleRadioClick">
            <el-radio-button label="hot">热门排序</el-radio-button>
            <el-radio-button label="marketValue">市值排序</el-radio-button>
            <el-radio-button label="buyPrice">高价收购</el-radio-button>
            <el-radio-button label="salePrice">低价出让</el-radio-button>
            <el-radio-button label="selected">特别关注</el-radio-button>
          </el-radio-group>
      </el-col>
      <el-col :sm="24" :md="8">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search_keyword"
          @change="submitKeywordToSearch">
        </el-input>
      </el-col>
    </el-row>
    
    
    <div class="card-list" v-loading="loading">
      <!-- 展示不同类别的卡片列表 -->
      <el-row :gutter="20">
        <el-col :sm="12" :xs="24" :md="8" v-for="(item,index) in showList" :indexs="index" :key="index">
          <div class="grid-content bg-purple">
            <Card :showItem="item"></Card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { apiStock } from "@/request/api";

import Card from "./components/Card.vue";
export default {
  name: "Home",
  components: {
    Card
  },
  data() {
    return {
      radio: "hot",
      showList: [],
      hotList: [],//TODO做一个本地store中存储
      marketValueList: [],
      buyPriceList: [],
      salePriceList: [],
      selectedList: [],
      loading:true,
      search_keyword:''
    };
  },
  methods: {
    handleRadioClick(label) {
      console.log(label);
      this.radio = label
      switch (label) {
        case "hot":
          this.onload({
            sort:'hot',
            keyword:'',
            page:1
          })
          break;
        case "marketValue":
          this.onload({
            sort:'marketValue',
            keyword:'',
            page:1
          })
          break;
        case "buyPrice":
          this.onload({
            sort:'buyPricet',
            keyword:'',
            page:1
          })
          break;
        case "salePrice":
          this.onload({
            sort:'salePrice',
            keyword:'',
            page:1
          })
          break;
        case "selected":
          this.onload({
            sort:'selected',
            keyword:'',
            page:1
          })
          break;
      }
    },
    submitKeywordToSearch(v){
      // console.log(v)
      let sort = this.radio
      this.onload({
        sort:sort,
        keyword:v,
        page:1
      })
    },
    // 发起请求 params label 获取不同的列表
    onload(p){
      apiStock(p).then(res=>{//allstock
        // console.log(res,'stocks')
        this.showList = res.data
        this.loading = false
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  created(){
    this.onload({
        sort:'hot',
        keyword:'',
        page:1
      })
  }
};
</script>
<style lang="scss" scoped>
.card-list{
  min-height: calc(60vh)
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
  background: white;
}
.bg-purple {
  background: white;
}
.bg-purple-light {
  background: white;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: white;
}
</style>