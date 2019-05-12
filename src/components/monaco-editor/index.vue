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
      <el-button type="primary" size="small" style="height:36px;" @click="onSubmit">提交代码</el-button>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import * as solution from '@/api/solution';
import * as utils from '@/utils';

export default {
  name: 'Editor',
  props: {
    problemId: {
      type: Number,
    },
    contestId: {
      type: Number,
    },
    challengeId: {
      type: Number,
    },
    code: {
      type: String,
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
        { value: 'c', name: 'C', id: 0 },
        { value: 'cpp', name: 'C++', id: 1 },
        { value: 'java', name: 'Java', id: 3 },
      ],
      languageList: {
        c: 0,
        cpp: 1,
        java: 3,
      },
      language: 'cpp',
      form: {
        problemId: 0,
        inDate: '',
        language: '',
        source: '',
      },
    };
  },
  watch: {
    code() {
      this.initEditor();
    },
  },
  methods: {
    onSubmit() {
      this.form = {
        problemId: this.problemId,
        inDate: utils.parseTime(new Date()),
        language: this.languageList[this.language],
        source: this.monacoEditor.getValue(),
      };
      if (this.contestId) {
        this.form.contestId = this.contestId;
      }
      if (this.challengeId) {
        this.form.challengeId = this.challengeId;
      }
      solution.upload(this.form)
        .then((result) => {
          if (result.code === 1) {
            this.$message({
              message: '提交成功',
              type: 'success',
            });
            this.$emit('onSubmit');
          } else {
            this.$message({
              message: '提交失败',
              type: 'warning',
            });
          }
        });
    },
    initEditor() {
      const self = this;
      self.monacoEditor = monaco.editor.create(self.$refs.container, {
        value: self.codesCopy || self.code,
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
