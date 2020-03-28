<template>
  <div>
    <div class="block" style="margin: 60px;margin-bottom: -60px;">
      <el-pagination layout="total" :total="total"></el-pagination></div>
      <el-table
        :data="tableData"
        border
        style="width: 90%;margin: 60px;"
        height="calc(80vh - 60px)"
      >
        <el-table-column fixed prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="账号名" width="80"></el-table-column>
        <el-table-column prop="nick_name" label="昵称" width="80"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="created_at" label="创建日期"></el-table-column>
      </el-table>
    
  </div>
</template>

<script>
import { apiUser } from "@/request/api";

export default {
  data() {
    return {
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
    getAllUsers() {
      apiUser({
        usersAll: true
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
    }
  },
  mounted() {
    this.getAllUsers();
  }
};
</script>