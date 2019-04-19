/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import { debounce } from '@/utils/echarts';

export const resize = {
  data() {
    return {
      sidebarElm: null,
      color: [
        '#0681ff',
        '#67c23a',
        '#e6a23c',
        '#f56c6c',
        '#909399',
        '#8d98b3',
        '#e5cf0d',
        '#97b552',
        '#95706d',
        '#dc69aa',
        '#07a2a4',
        '#9a7fd1',
        '#588dd5',
        '#f5994e',
        '#c05050',
        '#59678c',
        '#c9ab00',
        '#7eb00a',
        '#6f5553',
        '#c14089',
      ],
    };
  },
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener('resize', this.__resizeHandler);

    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHandler);

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler();
      }
    },
  },
};
