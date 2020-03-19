<template>
  <div class="lunbo">
    <div class="lunbo-title">
      <p>恭喜你 发现一枚宝藏up 愿你不枉此行</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "header"
};
</script>
<style lang="scss" scoped>
.lunbo {
  min-width: 378px;
  background-size: cover;
  height: 60px;
  color: #fff;
  text-align: center;
  font-weight: 600;
  position: relative;
  background: rebeccapurple;
  opacity: 0.8;
}
.lunbo-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>