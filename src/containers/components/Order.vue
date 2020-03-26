<template>
  <div style="margin:50px">
    <el-table :data="showTableData" border style="width: 100%">
      <el-table-column prop="id" label="订单号"></el-table-column>
      <!--  width="180" -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag size="medium" v-if="scope.row.status=='进行中'">{{ scope.row.status }}</el-tag>
          <el-tag type="danger" v-if="scope.row.status=='取消'">{{ scope.row.status }}</el-tag>
          <el-tag type="success" v-if="scope.row.status=='已完成'">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <!--  padding->进行中,cancel取消 -->
      <el-table-column prop="stock" label="对象">
        <template slot-scope="scope">
          <el-link type="primary" @click="()=>{handleClickCoverToDetail(scope.row.code)}">
            <!-- <router-link :to="'/detail/'+scope.row.code">{{scope.row.stock}}</router-link> -->
            {{scope.row.stock}}
          </el-link>
        </template>
      </el-table-column>
      <!--点击对象名跳到对应detail页 -->
      <el-table-column prop="price" label="价格/援力"></el-table-column>
      <!--  价格/100-->
      <el-table-column prop="amount" label="数量/股"></el-table-column>
      <el-table-column prop="finished_amount" label="完成数量"></el-table-column>
      <el-table-column prop="created_at" label="下单时间" width="180"></el-table-column>
      <!-- 搞成 2020-03-25 15:31:43-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status=='进行中'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >撤单</el-button>
        </template>
      </el-table-column>
      <!--  撤单按钮-->
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="defaultPS"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { apiMyOrders, apiMyOrdersCancel } from "@/request/api";
export default {
  data() {
    return {
      alltableData: [],
      pageSizes: [5, 10, 30, 50], //可设置每页展示多少条数据 ，默认5条
      defaultPS: 5, //每页显示多少条
      currentPage: 1 //当前页数
    };
  },
  computed: {
    showTableData: {
      get: function() {
        if (this.currentPage == 1) {
          return this.alltableData.slice(0, this.defaultPS);
        } else {
          let r = this.alltableData.slice(
            (this.currentPage - 1) * this.defaultPS,
            this.defaultPS * this.currentPage
          );
          // console.log(r)
          return r;
        }
      },
      set: function(v) {
        console.log(v, "---");
        return v;
      }
    },
    total: {
      get() {
        return this.alltableData.length;
      }
    }
  },
  methods: {
     handleClickCoverToDetail(code){
      console.log('查看对应艺人的详情，需要有个id标识',code)
      // 跳转至详情页面
      // this.$router.push({
      //   name:'Detail',
      //   params:{
      //     code,
      //   }
      // })
      this.$router.push({
        path:'/detail',
        query:{
          code,
        }
      })
    },
    addZero(obj){
      if(obj<10) return "0" +""+ obj;
        else return obj;
    },
    todate(inputstr) {
      //Wed, 25 Mar 2020 15:56:03 +0800  2020-03-25 15:31:43
       var d = new Date(inputstr) 
        let youWant=d.getFullYear() + '-' + this.addZero(d.getMonth() + 1) + '-' + this.addZero(d.getDate()) + ' ' + this.addZero(d.getHours())
         + ':' + this.addZero(d.getMinutes()) + ':' + this.addZero(d.getSeconds()); 
        return youWant;
    },
    handleDelete(index, row) {
      console.log(index, row);
      apiMyOrdersCancel(row.id)
        .then(res => {
          console.log(res, "cancel");
          this.onload({
            code: "",
            status: "",
            page: 1
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onload(p) {
      apiMyOrders(p)
        .then(res => {
          console.log(res, "order");
          res.data.forEach(item=>{
            if(item.status=='padding'){
              item.status = '进行中'
            }
            if(item.status=='success'){
              item.status = '已完成'
            }
            if(item.status=='cancel'){ 
              item.status='取消' }
           item.price = item.price/100
           item['created_at'] = this.todate(item['created_at'])
          })
          this.alltableData = res.data;
          console.log(this.alltableData,'======')
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.defaultPS = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      // this.showTableData =  this.alltableData.slice((this.currentPage-1)*this.defaultPS,this.defaultPS*this.currentPage)
    }
  },
  mounted() {
    this.onload({
      code: "",
      status: "",
      page: 1
    });
  }
};
</script>
<style lang="css" scoped>
.block {
  margin-top: 20px;
}
</style>

