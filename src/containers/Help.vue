<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>简介</span>
      </div>
      <div>欢迎来到「援力满满 - 男神交易所」</div>
      <div>本站的目的，是通过市值的方式，动态的展示不同男神的人气高低。</div>
      <div>你可能需要快速的游览下面的一些基础设定，来帮助你尽快的融入这个游戏。</div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>「援力满满」速查词典</span>
      </div>
      <div>「援力」是本站唯一指定货币。伴随着角色被「许愿系统」充能后产生的一种神秘力量。你可以使用这种力量去和其他玩家交易。</div>
      <div>「股票」是「许愿系统」向粉丝发放一种可转凭证，拥有这种凭证的多少，象征着你对这个角色的贡献的多少。你可以使用「援力」买入，也可以卖出这种凭证。</div>
      <div>「许愿系统」粉丝通过「许愿系统」向自己喜欢的角色传达爱意。在这个过程中，「许愿系统」会自动向粉丝发放「股票」和「援力」奖励</div>
      <div>「交易系统」由于「股票」具有可以转让的特性，粉丝们可以通过「援力满满 - 二次元交易所」提供的交易功能互相交易自己喜欢的角色。</div>
      <div>「喊话」「许愿」和「交易」的时候可以附加一句话作为「喊话」。你可以用来表达你的态度，或者回应别人的「喊话」，请尽量使用。</div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>「许愿系统」</span>
      </div>
      <div>「许愿系统」说到底，就是通过献祭自己拥有的计算力来获得「股票」和「援力」的系统。</div>
      <div>本站认为，算力是比IP地址或者手机号更为公平的投票工具，所以本站使用算力作为衡量用户对角色喜爱程度的主要标准。</div>
      <div>最简单的一种是使用对应角色页面上的「许愿按钮」，你就可以获得这个角色的「股票」和「援力」了。</div>
      <div>一天之内你可以使用网页上的「许愿按钮」获得多达100次的奖励。</div>
      <div>在使用「许愿按钮」的时候，浏览器会进行剧烈的计算，你可能会体验到一定程度的卡顿，这是正常现象。</div>
      <div>不过请放心，在你没有使用许愿按钮的时候，我们不会偷偷地在后台进行计算。</div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>「交易系统」</span>
      </div>
      <div>「援力满满 - 男神交易所」最重要的功能自然是「交易」。</div>
      <div>本站认为，算力是比IP地址或者手机号更为公平的投票工具，所以本站使用算力作为衡量用户对角色喜爱程度的主要标准。</div>
      <div>你可以喜欢就买，不喜欢就卖，这是一种玩法。当然你也可以很投机的去预测人物人气未来的走向，很投机的去持有，或者提早卖出一些股票。</div>
      <div>交易撮合的规则是这样：</div>
      <div>先寻找「出价最高」的「买单」，然后从寻找可用的「卖单」，然后「卖单」挂单的顺序依次成交，成交价格是按照「买家的价格」成交。</div>
      <div>这里和真实的股市有个重要的不同点，本站是按照买家的价格成交的，这样就避免了卖家使用低价卖单砸盘的情况。</div>
      <div>看好这只股的股东需要用「比较高的买价护盘」，而另一方需要足够多的股票才能完成砸盘操作，在这个实质上是个投票系统的交易市场上是比较合理的。</div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Help"
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

