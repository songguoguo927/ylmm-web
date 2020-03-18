<template>
<div style="margin:50px">
  <el-table :data="showTableData" border style="width: 100%">
    <el-table-column prop="dealsID" label="交易ID"></el-table-column> <!--  width="180" -->
    <el-table-column prop="time" label="时间"></el-table-column>
    <el-table-column prop="guadan" label="挂单ID"></el-table-column>
    <el-table-column prop="type" label="类型"></el-table-column>
    <el-table-column prop="yuanli" label="援力变化"></el-table-column>
    <el-table-column prop="stock" label="股票变化"></el-table-column>
    <el-table-column prop="details" label="详情"></el-table-column>
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
  export default {
    data() {
      return {
        alltableData:[
          {
            dealsID:'1',
            time:'已售',
            guadan:'222',
            price:233,
            type:100,
            yuanli:50,
            stock:'2019.10.27',
            details:'000'
          },
          { dealsID:'2',},
          { dealsID:'3',},
          { dealsID:'4',},
          { dealsID:'5',},
          { dealsID:'6',},
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
  }
</script>
<style lang="css" scoped>
.block{
  margin-top:20px;
}
</style>
