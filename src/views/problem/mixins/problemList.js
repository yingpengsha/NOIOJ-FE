export const problemList = {
  data() {
    return {
      selectTags: new Array(8),
      difficulty: ['入门', '简单', '中等', '困难', '超难'],
      options: [
        { label: '编号', value: 'problemId' },
        { label: '难度', value: 'difficulty' },
        { label: '通过率', value: 'rate' },
      ],
      selectList: [
        {
          title: '难度',
          key: 'difficulty',
          options: [
            { name: '全部', value: null },
            { name: '入门', value: 0 },
            { name: '简单', value: 1 },
            { name: '中等', value: 2 },
            { name: '困难', value: 3 },
            { name: '超难', value: 4 },
          ],
        },
        {
          title: '收费/免费',
          key: 'isFree',
          options: [
            { name: '全部', value: null },
            { name: '收费', value: 0 },
            { name: '免费', value: 1 },
          ],
        },
      ],
      classList: [
        { name: '搜索/递归/回溯', value: 0, tags: [] },
        { name: '排序', value: 1, tags: [] },
        { name: '数学', value: 2, tags: [] },
        { name: '动态规划', value: 3, tags: [] },
        { name: '其他算法', value: 4, tags: [] },
        { name: '树结构', value: 5, tags: [] },
        { name: '线性结构', value: 6, tags: [] },
        { name: '其他数据结构', value: 7, tags: [] },
      ],
    };
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleClassFilter(key, value) {
      this.listQuery[key] = value;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleTagsFilter() {
      const list = [];
      this.selectTags.forEach((element) => {
        if (element) {
          list.push(element);
        }
      });
      this.listQuery.tags = list;
      this.getList();
    },
    handleToProblemDetail(row) {
      console.log(row);
    },
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
