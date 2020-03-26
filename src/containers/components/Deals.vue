<template>
<div style="margin:50px">
  <el-table :data="showTableData" border style="width: 100%">
    <el-table-column prop="id" label="交易ID"></el-table-column> <!--  width="180" -->
    <el-table-column prop="created_at" label="时间"></el-table-column>
    <el-table-column prop="buy_order_id" label="挂单ID"></el-table-column>
    <el-table-column prop="type" label="类型"></el-table-column>
    <el-table-column prop="yuanli" label="援力变化"></el-table-column> <!--  16 援力/股 买了100股 花了1600援力  -1600 -->
    <el-table-column prop="stock" label="股票变化"></el-table-column> <!--  100 -->
    <el-table-column prop="details" label="详情"></el-table-column> <!-- 股票变化我从谁手上买了100股，我支付了多少援力给谁 -->
    <!-- 我从「紫木灼」手上买入了100股薇尔莉特·伊芙加登 ；我支付了1600.00援力给「紫木灼」-->
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="defaultPS"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import {apiMyDeals} from '@/request/api'
export default {
  data() {
    return {
      alltableData: [],
      pageSizes: [5, 10, 30, 50], //可设置每页展示多少条数据 ，默认5条
      defaultPS: 5, //每页显示多少条
      currentPage: 1 //当前页数
    }
  },
  computed:{
    showTableData:{
      get: function () {
        if(this.currentPage==1){
          return this.alltableData.slice(0,this.defaultPS)
        }
        else{
          let r = this.alltableData.slice((this.currentPage-1)*this.defaultPS,this.defaultPS*this.currentPage)
          // console.log(r)
          return r
        }
      },
      set:function(v){
        // console.log(v,'---')
        return v
      }
    },
    total:{
      get(){
        return this.alltableData.length
      }
    }
  },
  methods: {
    onload(p){
      apiMyDeals(p).then(res=>{
        // console.log(res,'deals')
        this.alltableData = res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.defaultPS = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val;
      // this.showTableData =  this.alltableData.slice((this.currentPage-1)*this.defaultPS,this.defaultPS*this.currentPage)
    }
  },
  created(){
    this.onload({
      // code:'MIO',
      page:1
    })
  }
}
</script>
<style lang="css" scoped>
.block{
  margin-top:20px;
}
</style>
