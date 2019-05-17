import marked from 'marked';
import * as utils from '@/utils';
import defaultAvator from '@/assets/public/avator.png';

const rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

export const Discuss = {
  data() {
    return {
      avator: defaultAvator,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: false, // 标记
        superscript: false, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: false, // 链接
        imagelink: false, // 图片链接
        help: false, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        /* 1.3.5 */
        undo: false, // 上一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
      },
    };
  },
  filters: {
    parseTime(date) {
      return utils.parseTime(date, '{y}-{m}-{d}');
    },
    markdown(content) {
      return marked(content, { sanitize: true });
    },
  },
};
