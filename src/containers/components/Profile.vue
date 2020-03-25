<template>
  <div style="margin:50px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总览</span>
      </div>
      <div class="x">资产规模：<Dynamic v-if="capital" :startVal='0' :endVal='parseInt(capital/100)' :speed='80' :decimals="0" :isReverse=false />援力</div>
      <div class="x">现金流：<Dynamic v-if="coinBalance" :startVal='0' :endVal='parseInt(coinBalance/100)' :speed='80' :decimals="0" :isReverse=false />援力</div>
      <!-- TODO:where 钱包地址 from-->
      <div class="x">钱包地址: {{$store.state.walletAddress}}</div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>明细</span>
      </div>
      <div v-for="(item,index) in stocksList" :key="index"  class="x">
        <p class="x">持有{{item.name}}{{item['shareholding_ratio']}}%</p>
        <p>
          <Dynamic :startVal='0' :endVal='item.balance' :speed='8' :decimals="0" :isReverse=false />股净值
          <Dynamic :startVal='0' :endVal='(item.balance*item.price/100)' :speed='8' :decimals="0" :isReverse=false />援力
        </p>
      </div>
    </el-card>

  </div>
</template>
<script>
import Dynamic from '@/containers/components/Dynamic.vue'
import {apiProfile} from '@/request/api'
export default {
  name: 'Profile',
  components:{
    Dynamic,
  },
  data(){
    return {
      coinBalance:'',//现金流
      capital:'',//资产规模
      stocksList:[],
      tipMessage:''
    }
  },
  created(){
    this.onload()
  },
  methods:{
    onload(){
      apiProfile().then(res=>{
        console.log(res,'profile')
          this.stocksList = res.stocks
          this.coinBalance = res['coin_balance']
          this.capital = res['capital']
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>
<style>
.x{
  margin-bottom: 10px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 480px; */
  margin-bottom: 20px;
}
</style>
