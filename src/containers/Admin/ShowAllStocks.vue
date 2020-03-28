<template>
  <div>
    <div class="block" style="margin: 60px;margin-bottom: -60px;">
      <el-pagination layout="total" :total="total" style="float:left"></el-pagination>
      <el-button type="primary" size="mini" @click="dialogFormVisible = true">上新股</el-button>
    </div>

    <el-table :data="tableData" border style="width: 90%;margin: 60px;" height="calc(80vh - 60px)">
      <el-table-column fixed prop="code" label="股票代号" width="150"></el-table-column>
      <el-table-column prop="name" label="名称" width="120"></el-table-column>
      <el-table-column prop="tags" label="特点" width="120"></el-table-column>
      <el-table-column prop="market_value" label="市场价值" width="120"></el-table-column>
      <el-table-column prop="buy_price" label="高价收购" width="120"></el-table-column>
      <el-table-column prop="sale_price" label="低价让出" width="120"></el-table-column>
      <el-table-column prop="created_at" label="创建日期"></el-table-column>
    </el-table>
    <el-dialog title="增加新股" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="代号" label-width="120">
          <el-input v-model="form.code" autocomplete="off" placeholder="例如：MIO，全大写"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="120">
          <el-input v-model="form.name" autocomplete="off" placeholder="例如：艾拉" width="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStock">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiStocksCreate, apiStockAll } from "@/request/api";

export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        code: "",
        name: "",
      },
      tableData: []
    };
  },
  computed: {
    total: {
      get() {
        return this.tableData.length;
      }
    }
  },
  methods: {
    addZero(obj) {
      if (obj < 10) return "0" + "" + obj;
      else return obj;
    },
    todate(inputstr) {
      //Wed, 25 Mar 2020 15:56:03 +0800  2020-03-25 15:31:43
      var d = new Date(inputstr);
      let youWant =
        d.getFullYear() +
        "-" +
        this.addZero(d.getMonth() + 1) +
        "-" +
        this.addZero(d.getDate()) +
        " " +
        this.addZero(d.getHours()) +
        ":" +
        this.addZero(d.getMinutes()) +
        ":" +
        this.addZero(d.getSeconds());
      return youWant;
    },
    getAllStocks() {
      apiStockAll({
        stocksAll: true
      })
        .then(res => {
          res.data.forEach(item => {
            item["created_at"] = this.todate(item["created_at"]);
          });
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addStock() {
      apiStocksCreate(this.form)
        .then(res => {
          console.log(res);
          this.$message({
              message: res.msg,
              type: "success"
          });
        })
        .catch(err => {
          console.log(err);
          this.$message({
              message: res.msg,
              type: "error"
          });
        });
    }
  },
  mounted() {
    this.getAllStocks();
  }
};
</script>