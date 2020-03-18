<template>
    <div class="footer-wrap">
      <div class="footer-container">
          <div class="introduce">
            about me
            <div class="weixin">
              <img src="@/assets/weix.png" alt="" class="weix" width="50" />
              <p>欢迎进行技术交流</p>
            </div>
            <h3>jam-garden emotion-hole</h3>
            <p class="jam">学习 记录 生活</p>
            <p class="hole">
              Here you can express their feelings on the troubles, we can solve
              all problems you emotionally. Here you can meet all kinds of love,
              you can see that the emotional world of rich and colorful.
            </p>
          </div>
          <div class="contact">
            <i class="bg-weixin" />
            <span>逢凉野性</span> <i class="bg-weibo" />
            <span>橘紫</span> <i class="bg-bilibili" />
            <span>夏夏虾</span>
            <i class="bg-wangyiyun" />
            <span>jiam927</span>
          </div>
          <p>
            &copy; jiam<i class="bg-heart" /> {{new Date().getFullYear()}}
          </p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'footer',
   data () {
    return {
      // weixin: require('@/assets/logo.png'),
    }
  },
}
</script>
<style lang="scss" scoped>
/* 图标样式 */

i {
  display: inline-block;
  vertical-align: middle;
  margin-right: 7px;
}
i.iconfont {
  vertical-align: baseline;
}
.bg-weixin {
  width: 16px;
  height: 16px;
  background: url("/images/css_sprites.png") -84px -10px;
}
.bg-weibo {
  width: 16px;
  height: 16px;
  background: url("/images/css_sprites.png") -46px -46px;
}

.bg-wangyiyun {
  width: 16px;
  height: 16px;
  background: url("/images/css_sprites.png") -10px -46px;
}
.bg-heart {
  width: 18px;
  height: 16px;
  background: url("/images/css_sprites.png") -10px -10px;
}
.bg-bilibili {
  width: 16px;
  height: 16px;
  background: url("/images/css_sprites.png") -84px -46px;
}
.footer-wrap{
  min-width: 378px;
  color: #999;
  background-color: #333;
  box-shadow: inset 0px -1px 0px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  height: 290px;
  font-size: 13px;
  display: flex;
  align-items: center;

  .footer-container {
    margin: 0 auto;
  }
  .contact {
    word-spacing: 20px;
  }
}
</style>