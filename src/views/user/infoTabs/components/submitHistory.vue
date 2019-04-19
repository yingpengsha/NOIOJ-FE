<template>
  <div :class="className" :style="{height:height,width:width}">
  </div>
</template>

<script>
import echarts from 'echarts';
import { resize } from '../mixins/resize';

require('echarts/theme/macarons');

export default {
  name: 'SubmitHistory',
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
      default: '140px',
    },
    chartData: {
      type: Object,
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
      this.chart.setOption({
        color: ['#0681FF'],
        tooltip: {},
        visualMap: {
          min: 0,
          max: 100,
          type: 'continuous',
          orient: 'horizontal',
          right: '25',
          dispaly: 'none',
          top: 125,
          textStyle: {
            color: '#000',
          },
        },
        calendar: {
          top: 20,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: '2019',
          itemStyle: {
            normal: { borderWidth: 0.5 },
          },
          yearLabel: { show: false },
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.getVirtulData(),
        },
      });
    },
    getVirtulData() {
      const year = '2019';
      const date = +echarts.number.parseDate(`${year}-01-01`);
      const end = +echarts.number.parseDate(`${+year + 1}-01-01`);
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 100),
        ]);
      }
      return data;
    },
  },
};
</script>
