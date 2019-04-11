<template>
  <div class="editor">
    <div id="container" ref="container" class="input"></div>
    <div class="footer">
      <el-select v-model="language" placeholder="选择语言" size="medium">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" style="height:36px;">提交代码</el-button>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
  name: 'Editor',
  props: {
    problemId: {
      type: Number,
    },
    codes: {
      type: String,
    },
    language: {
      type: String,
      default() {
        return 'cpp';
      },
    },
    editorOptions: {
      type: Object,
      default() {
        return {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false, // 只读
          cursorStyle: 'line', // 光标样式
          automaticLayout: false, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 30, // 字体大小
          autoIndent: true, // 自动布局
          // quickSuggestionsDelay: 500, // 代码提示延时
        };
      },
    },
  },
  data() {
    return {
      theme: 'vs',
      codesCopy: null, // 内容备份
      options: [
        { value: 'c', name: 'C' },
        { value: 'cpp', name: 'C++' },
        { value: 'java', name: 'Java' },
      ],
    };
  },
  methods: {
    initEditor() {
      const self = this;
      self.$refs.container.innerHTML = '';
      self.monacoEditor = monaco.editor.create(self.$refs.container, {
        value: self.codesCopy || self.codes,
        language: self.language,
        theme: self.theme, // vs, hc-black, or vs-dark
        editorOptions: self.editorOptions,
      });
      self.$emit('onMounted', self.monacoEditor);// 编辑器创建完成回调
      self.monacoEditor.onDidChangeModelContent((event) => { // 编辑器内容changge事件
        self.codesCopy = self.monacoEditor.getValue();
        self.$emit('onCodeChange', self.monacoEditor.getValue(), event);
      });
      // 编辑器随窗口自适应
      window.addEventListener('resize', () => {
        this.initEditor();
      });
    },
  },
  mounted() {
    this.initEditor();
  },
};
</script>

<style lang="scss" scoped>
.editor{
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  background: $grayBack;
  margin: 5px;
  padding: 5px;
  .footer{
    height: 40px;
    padding: 5px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .input{
    height: calc(100% - 60px);
    margin-bottom: 10px;
  }
}
</style>
