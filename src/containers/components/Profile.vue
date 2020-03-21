<template>
  <div style="margin:50px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总览</span>
      </div>
      <div>资产规模：{{parseInt(capital/100)}}援力</div>
      <div>现金流：{{parseInt(coinBalance/100)}}援力</div>
      <!-- TODO:where 钱包地址 from-->
      <div>钱包地址: W4mWNPlFYz3xXQgZgGyhIQwzyxyoWvh0mP</div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>明细</span>
      </div>
      <div v-for="(item,index) in stocksList" :key="index">
        <p>持有{{item.name}}{{item['shareholding_ratio']}}%</p>
        <p>{{item.balance}}股净值{{item.balance*item.price/100}}援力</p>
</div>
    </el-card>

  </div>
</template>
<script>
import {apiProfile} from '@/request/api'
export default {
  name: 'Profile',
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
