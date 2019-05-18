<template>
  <div :class="className" :style="{height:height,width:width,paddingTop:'25px'}">
  </div>
</template>

<script>
import echarts from 'echarts';
import { resize } from '../mixins/resize';

require('echarts/theme/macarons');

export default {
  name: 'DataStructStatistic',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '300px',
    },
    chartData: {
      type: Array,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
    };
  },
  mounted() {
    this.initChart();
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData);
    },
    setOptions() {
      let { max } = this;
      if (max < 5) {
        max = 5;
      }
      this.chart.setOption({
        color: ['#67C23A'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        radar: {
          radius: '66%',
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15,
            },
          },
          indicator: [
            { name: '树结构', max: max + 1 },
            { name: '线性结构', max: max + 1 },
            { name: '其他数据结构', max: max + 1 },
          ],
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
          },
          data: [
            {
              value: this.chartData,
              name: '算法能力',
            },
          ],
        }],
      });
    },
  },
};
</script>
