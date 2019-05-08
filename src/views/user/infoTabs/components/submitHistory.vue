<template>
  <div :class="className" :style="{height:height,width:width}">
  </div>
</template>

<script>
import echarts from 'echarts';
import { resize } from '../mixins/resize';
import * as utils from '@/utils';

require('echarts/theme/shine');

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
      default: '150px',
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
      this.chart = echarts.init(this.$el, 'shine');
      this.setOptions(this.chartData);
    },
    setOptions() {
      this.chart.setOption({
        color: ['#0681FF'],
        tooltip: {},
        visualMap: {
          min: 1,
          max: this.max,
          type: 'continuous',
          orient: 'horizontal',
          right: '25',
          dispaly: 'none',
          top: 135,
          textStyle: {
            color: '#000',
          },
        },
        calendar: {
          top: 20,
          left: 30,
          right: 30,
          cellSize: 16,
          range: [utils.parseTime(new Date() - 365 * 24 * 60 * 60 * 1000), utils.parseTime(new Date())],
          splitLine: {
            lineStyle: {
              color: '#fff',
            },
          },
          itemStyle: {
            color: '#eee',
            borderColor: '#fff',
            borderWidth: 1.6,
          },
          dayLabel: {
            show: false,
          },
          monthLabel: {
            nameMap: 'cn',
          },
          yearLabel: {
            show: false,
          },
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.chartData,
        },
      });
    },
  },
};
</script>
