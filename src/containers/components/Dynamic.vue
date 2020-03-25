<template>
  <span>{{printVal}}</span>
</template>

<script>
export default {
  props: {
    startVal: {
      type: [String, Number],
      default: ''
    },
    endVal: {
      type: [String, Number],
      default: ''
    },
    speed: {
      type: [String, Number],
      default: 5
    },
    decimals: {
      type: [String, Number],
      default: 0
    },
    isReverse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      start: +this.startVal,
      end: +this.endVal,
      formatSpeed: +this.speed || 5
      // startVal: 0,		// 起始值
      // endVal: 10,		// 最终值
      // speed: 500,		// 速度
      // decimals: 3,		// 保留几位小数（不会四舍五入）
      // isReverse: false		// 是否允许从大到小（默认false）

    };
  },
  computed: {
    formatDecimals() {
      // 是否整数
      let formatDecimals = this.decimals > 0 ? this.decimals : 0;
      return formatDecimals
    },
    decimalsLen() {
      // 1 = 0.001 * decimalsLen(x);
      let decimalsLen = Math.pow(10, this.formatDecimals);
      return decimalsLen;
    },
    printVal() {
      // 保留几位小数
      let start = (
        parseInt(this.start * this.decimalsLen) / this.decimalsLen
      ).toFixed(this.formatDecimals);
      return start;
    }
  },
  watch: {},
  methods: {
    accumulativeMachine() {
      setTimeout(() => {
        if (this.isReverse) {
          let decimals = this.formatDecimals === 0 ? 0 : 1 / this.decimalsLen;
          let formatSpeed = this.formatSpeed / this.decimalsLen + decimals;
          this.start -= formatSpeed;
          if (this.printVal <= this.end) {
            this.start = this.end;
            return
          }
        } else {
          let decimals = this.formatDecimals === 0 ? 0 : 1 / this.decimalsLen;
          let formatSpeed = this.formatSpeed / this.decimalsLen + decimals;
          this.start += formatSpeed;
          if (this.printVal >= this.end) {
            this.start = this.end;
            return
          }
        }
        this.accumulativeMachine();
      }, 8);
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.accumulativeMachine();
    });
  }
};
</script>
