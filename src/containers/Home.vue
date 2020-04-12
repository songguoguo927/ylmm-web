<template>
  <div style="margin:30px;">
    <el-row>
      <el-col :sm="24" :md="16">
          <el-radio-group v-model="radio" style="margin-bottom: 20px;" @change="handleRadioClick">
            <el-radio-button label="hot">热门排序</el-radio-button>
            <el-radio-button label="marketValue">市值排序</el-radio-button>
            <el-radio-button label="buyPrice">高价收购</el-radio-button>
            <el-radio-button label="salePrice">低价出让</el-radio-button>
            <el-radio-button label="selected" v-if="$store.state.isLogin">特别关注</el-radio-button>
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
import { apiStockSort } from "@/request/api";

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
      search_keyword:'',
      page:1,
      currentRequestResultisNull:false
    };
  },
  methods: {
    handleRadioClick(label) {
      console.log(label);
      this.radio = label
      this.page = 1
      this.showList = []
      this.currentRequestResultisNull = false
      switch (label) {
        case "hot":
          this.onload({
            sort:'hot',
            keyword:'',
            page:this.page
          })
          break;
        case "marketValue":
          this.onload({
            sort:'marketValue',
            keyword:'',
            page:this.page
          })
          break;
        case "buyPrice":
          this.onload({
            sort:'buyPricet',
            keyword:'',
            page:this.page
          })
          break;
        case "salePrice":
          this.onload({
            sort:'salePrice',
            keyword:'',
            page:this.page
          })
          break;
        case "selected":
          this.onload({
            sort:'selected',
            keyword:'',
            page:this.page
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
        page:this.page
      })
    },
    // 发起请求 params label 获取不同的列表
    onload(p){
      apiStockSort(p).then(res=>{//allstock
        // console.log(res,'stocks')
        if(res.data.length==0) this.currentRequestResultisNull = true
        this.showList.push(...res.data)
        this.loading = false
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  created(){
    this.onload({
        sort:this.sort,
        keyword:'',
        page:this.page
      })
  },
  mounted(){

    this.$nextTick(() => {
      var cardList = document.querySelector('.card-list')
      cardList.addEventListener('scroll', (e) => {
        let winInnerHeight = window.innerHeight // 视窗的高度668
        let cardListHeight = cardList.scrollHeight // 1080 cardList内容的高度calc(100vh - 170px)
        let cardListScrollTop = e.target.scrollTop // 滚动的高度 最大162 bian
        if ((cardListScrollTop + winInnerHeight >= cardListHeight + 165) && !this.currentRequestResultisNull ) {
          this.onload({
            sort:this.radio,
            keyword:'',
            page:++this.page
          })
        }
      })
    })
  }
};
</script>
<style lang="scss" scoped>
.card-list{
  min-height: calc(60vh);
  height:calc(100vh - 170px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 20px;
}
// .card-list::-webkit-scrollbar {
//   width: 0.5rem;
//   height: 0.5rem;
//   background: #fff;
//   border-radius: 0.2rem;
// }
// .card-list::-webkit-scrollbar-track {
//   border-radius: 0.2rem;
// }
// .card-list::-webkit-scrollbar-thumb {
//   background-color: rgba(102,52,153,0.8);
//   transition: all 0.2s;
//   border-radius: 0.5rem;
// }
// .card-list::-webkit-scrollbar-thumb:hover {
//   background-color: rgba(102,52,153,0.8);
// }
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