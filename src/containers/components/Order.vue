<template>
<div style="margin:50px">
  <el-table :data="showTableData" border style="width: 100%">
    <el-table-column prop="orderId" label="订单号"></el-table-column> <!--  width="180" -->
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column prop="who" label="对象"></el-table-column>
    <el-table-column prop="price" label="价格"></el-table-column>
    <el-table-column prop="nums" label="数量"></el-table-column>
    <el-table-column prop="finishedNums" label="完成数量"></el-table-column>
    <el-table-column prop="orderTime" label="下单时间"></el-table-column>
    <el-table-column prop="operation" label="操作"></el-table-column>
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
import {apiMyOrders} from '@/request/api'
export default {
  data() {
    return {
      alltableData:[
        {
          orderId:'1',
          status:'已售',
          who:'222',
          price:233,
          nums:100,
          finishedNums:50,
          orderTime:'2019.10.27',
          operation:'000'
        },
        { orderId:'2',},
        { orderId:'3',},
        { orderId:'4',},
        { orderId:'5',},
        { orderId:'6',},
      ],
      pageSizes:[1, 2, 3, 4],//可设置每页展示多少条数据 ，默认1条
      defaultPS:1,//每页显示多少条
      currentPage: 1,//当前页数
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
        console.log(v,'---')
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
      apiMyOrders(p).then(res=>{
        console.log(res,'order')
        this.alltableData.unshift(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.defaultPS = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val;
      // this.showTableData =  this.alltableData.slice((this.currentPage-1)*this.defaultPS,this.defaultPS*this.currentPage)
    }
  },
  created(){
    this.onload({
      code:'ISLA',
      status:'',
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

