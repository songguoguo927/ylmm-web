<template>
  <div style="margin:50px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>「许愿系统」公示栏</span>
      </div>
      <!-- TODO数字显示做成动态的 -->
      <div>当前难度：24</div>
      <div>单次许愿成功需要：16,777,216次计算</div>
      <div>全局算力：27,962,027 Hash/s</div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>现任老婆功能</span>
      </div>
      <ul>
        <li>每日凌晨5点检查一次</li>
        <li>如果第一名发生了变换，现任老婆会发生变换</li>
      </ul>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>支持按照卖出价格排序的「低价出让」</span>
      </div>
      <div>成交顺序修改</div>
      <ul>
        <li>按照买单价格成交，方便护盘</li>
        <li>高价买单先成交，方便护盘</li>
        <li>高价买单寻找可用范围内的卖单，然后按照卖单的挂单顺序成交</li>
      </ul>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>支持按照买入价格排序的「高价收购」</span>
      </div>
      <div>把许愿公示栏移到了运营公告</div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>查询历史交易记录</span>
      </div>
      <ul>
        <li>新增挂单列表</li>
        <li>修改交易列表</li>
      </ul>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>排行的更新时间</span>
      </div>
      <ul>
        <li>10分钟一次</li>
      </ul>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>多种排序</span>
      </div>
      <ul>
        <li>市值排序功能</li>
        <li>可自选股功能，可以在股票详情页选择，然后在首页快速寻找</li>
      </ul>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>大幅放宽了交易限制</span>
      </div>
      <ul>
        <li>总体挂单数量不再限制</li>
        <li>单个股票的挂单数量改到每个股票可以挂6单</li>
      </ul>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>援力白皮书</span>
      </div>
      <ul>
        <li>https://github.com/bydmm/yuanlimm-cli/blob/master/white_paper.md</li>
        <li>援力榜不再包括援力现金</li>
      </ul>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Post"
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