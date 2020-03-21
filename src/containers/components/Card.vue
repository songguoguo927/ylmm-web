<template>
 <div style="height:265px;">
  <div style="height:178px">
    <img
    v-if="this.showItem.avatar"
    :src="this.showItem.avatar"
    class="image"
    @click="()=>{handleClickCoverToDetail(this.showItem.code)}"
    >
    <el-image v-else fit="cover">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
    
  <!-- src="@/assets/timg4.jpg"-->
  <div class="detail">
    <p style="margin-bottom:15px">{{this.showItem.name}}</p>
    <div style="display:flex;justify-content: space-between;">
      <div><span style="margin-right:10px">{{this.showItem.price}}</span>
      <span style="color:#f56c6c">TODO-price_change</span></div>
      <button class="removeBtnDefault" @click="()=>{handleClickCoverToDetail(this.showItem.code)}">查看详情</button>
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
  props:['showItem'],
  methods: {
    handleClickCoverToDetail(code){
      console.log('查看对应艺人的详情，需要有个id标识',code)
      // 跳转至详情页面
      this.$router.push('/detail/'+code)
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
    /* box-shadow: 5px -5px 5px gray;*/
     border-radius:  5px 5px 0 0 ;
     box-shadow: 0 0 15px rgba(0, 0, 0, 0.08)
  }
  .detail{
    border: 1px solid #F0F0F0;
    border-top:none;
    border-radius: 0 0 5px 5px ;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
    padding: 10px;
  }
  p,span{
    cursor: default;
  }
  .removeBtnDefault{
    border:none;background:transparent;color:rgba(102,52,153,0.8);cursor:pointer;
  }
</style>