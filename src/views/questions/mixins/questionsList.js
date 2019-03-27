export const questionsList = {
  data() {
    return {
      options: [
        { label: '编号升序', value: '1' },
        { label: '编号降序', value: '2' },
        { label: '难度升序', value: '3' },
        { label: '难度降序', value: '4' },
        { label: '通过率升序', value: '3' },
        { label: '通过率降序', value: '4' },
      ],
      selectList: [
        {
          title: '难度',
          key: 'hard',
          options: [
            { name: '入门', value: '0' },
            { name: '简单', value: '1' },
            { name: '中等', value: '2' },
            { name: '困难', value: '3' },
            { name: '超难', value: '4' },
          ],
        },
        {
          title: '难度',
          key: 'hard',
          options: [
            { name: '入门', value: '0' },
            { name: '简单', value: '1' },
            { name: '中等', value: '2' },
            { name: '困难', value: '3' },
            { name: '超难', value: '4' },
            { name: '超难', value: '4' },
          ],
        },
      ],
    };
  },
  methods: {

  },
  filters: {
    tagStyle(difficulty) {
      let style = 'background:';
      switch (difficulty) {
        case '入门':
          style += '#909399';
          break;
        case '简单':
          style += '#67C23A';
          break;
        case '中等':
          style += '#0681FF';
          break;
        case '困难':
          style += '#E6A23C';
          break;
        case '超难':
          style += '#F56C6C';
          break;
        default:
          break;
      }
      return style;
    },
  },
};
