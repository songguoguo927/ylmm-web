<template>
 <div style="height:265px;">
  <div style="height:178px">
    <img
    src="@/assets/timg4.jpg"
    class="image"
    @click="handleClickCoverToDetail"
  >
  </div>
  <div class="detail">
    <p style="margin-bottom:15px">易烊千玺</p>
    <div style="display:flex;justify-content: space-between;">
      <span>62617.00</span>
      <span style="color:#f56c6c">+31208.50%</span>
      <span style="color:#409eff;cursor:pointer" @click="handleClickCoverToDetail">查看详情</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },
  methods: {
    handleClickCoverToDetail(){
      console.log('查看对应艺人的详情，需要有个id标识')
      // 跳转至详情页面
      this.$router.push({
        name:'Detail',
        query:{
          id:123
        }
      })
    }
  }
}
</script>
<style>
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
  .detail{
    margin:15px;
  }
  p,span{
    cursor: default;
  }
</style>