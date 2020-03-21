<template>
    <div style="margin:50px">   
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>援力50</span>
      </div>
      <div class="item" v-for="(item,index) in rankList" :key="index">
        <div >{{item.user}} : {{parseInt(item.capital/100)}}援力</div>
        <div>老公（暂定）：{{item.stock}}</div>
      </div>
      <div>{{tipMessage}}</div>
    </el-card>
    </div>
</template>

<script>
import { apiRank } from "@/request/api";

export default {
  name: 'Richer',
  data(){
    return {
      rankList:[],
      tipMessage:''
    }
  },
  created(){
    this.onload()
  },
  methods:{
    onload(){
      apiRank().then(res=>{
        console.log(res,'rank')
       if(res.data){
          this.rankList = res.data
       }else{
         this.tipMessage = res.msg
       }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>