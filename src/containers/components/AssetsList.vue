<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总览</span>
      </div>
      <div>资产规模：327,330援力</div>
      <div>现金流：10,000援力</div>
      <div>钱包地址: W4mWNPlFYz3xXQgZgGyhIQwzyxyoWvh0mP</div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>明细</span>
      </div>
      <div>持有楪祈0.02%
500股净值99,000援力</div>
      <div>持有茉茉‧贝莉雅‧戴比路克0.03%
500股净值33,330援力</div>
    </el-card>

  </div>
</template>
<script>
export default {
  name: "AssetsList"
};
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
