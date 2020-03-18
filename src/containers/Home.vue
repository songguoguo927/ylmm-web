<template>
  <div>
    <el-radio-group v-model="radio" style="margin-bottom: 30px;" @change="handleClick">
      <el-radio-button label="popular-sort">热门排序</el-radio-button>
      <el-radio-button label="market-value-sort">市值排序</el-radio-button>
      <el-radio-button label="high-price-in">高价收购</el-radio-button>
      <el-radio-button label="low-price-out">低价出让</el-radio-button>
      <el-radio-button label="special-attention">特别关注</el-radio-button>
    </el-radio-group>
    <div class="card-list">
      <!-- 展示不同类别的卡片列表 -->
      <el-row :gutter="20">
        <el-col :sm="12" :xs="24" :md="6" v-for="(item,index) in showList" :indexs="index" :key="index">
          <div class="grid-content bg-purple">
            <Card></Card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Card from "./components/Card.vue";
export default {
  name: "Home",
  components: {
    Card
  },
  data() {
    return {
      radio: "popular-sort",
      showList: [1, 2, 3, 4]
    };
  },
  methods: {
    handleClick(label) {
      console.log(label);
      switch (label) {
        case "popular-sort":
          break;
        case "market-value-sort":
          break;
        case "high-price-in":
          break;
        case "low-price-out":
          break;
        case "special-attention":
          break;
      }
    }
    // 发起请求 params label 获取不同的列表
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: white;
}
.bg-purple {
  background: white;
}
.bg-purple-light {
  background: white;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: white;
}
</style>