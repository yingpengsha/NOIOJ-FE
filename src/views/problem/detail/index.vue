<template>
  <div class="detail">
    <header-bar :problem="problem" />

    <main>
      <div class="detail">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label"><svg-icon icon-class="detail"></svg-icon> 题目详情</span>
            <problem-info :problem="problem"/>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"><svg-icon icon-class="message"></svg-icon> 讨论区</span>
            <discuss-area :problem="problem.problemId"/>
          </el-tab-pane>
          <el-tab-pane name="third">
            <span slot="label"><svg-icon icon-class="ago"></svg-icon> 提交记录</span>
            <submit-record />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="editor">
        <editor />
      </div>
    </main>

    <problem-list v-if="leftList" ref="leftList" :packet-id="problem.packetId" @reload="reload" @unShow="handleToControlLeft"/>
    <div class="openButtonClass" @click="handleToControlLeft" ref="openButton">
      <i class="el-icon-arrow-left" v-if="leftList"></i>
      <i class="el-icon-arrow-right" v-else></i>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/monaco-editor/index.vue';
import * as problem from '@/api/problem';
import ProblemList from './components/problemList.vue';
import HeaderBar from './components/headerBar.vue';
import ProblemInfo from './components/problemInfo.vue';
import DiscussArea from './components/discussArea.vue';
import SubmitRecord from './components/submitRecord.vue';

export default {
  name: 'ProblemDetail',
  data() {
    return {
      problem: {},
      leftList: false,
      activeName: 'first',
    };
  },
  computed: {
    problemId() {
      return this.$route.params.id;
    },
  },
  methods: {
    handleToControlLeft() {
      if (this.leftList) {
        this.$refs.openButton.style.left = '0px';
        this.$refs.leftList.changeClass();
        window.setTimeout(() => { this.leftList = false; }, 300);
      } else {
        this.leftList = true;
        this.$refs.openButton.style.left = '600px';
      }
    },
    getProblem() {
      problem.queryById(this.problemId)
        .then((result) => {
          this.problem = result.data;
        });
    },
    reload(obj) {
      this.$router.push({ name: 'problemDetail', params: { id: obj.id } });
      this.getProblem();
    },
  },
  created() {
    this.getProblem();
  },
  components: {
    Editor,
    ProblemList,
    HeaderBar,
    ProblemInfo,
    DiscussArea,
    SubmitRecord,
  },
};
</script>

<style lang="scss" scoped>
.detail{
  height: 100%;
  width: 100%;
  .leftBackground{
    width: 100vw;
    height: 100vh;
    background:  rgba(0, 0, 0, .3);
    position:fixed;
    top: 0;
    left: 0;
  }
  main{
    width: 100%;
    height: calc(100% - 60px);
    background: $grayBack;
    display: flex;
    .detail{
      min-width: calc(50% - 20px);
      height: calc(100% - 20px);
      background: white;
      margin:10px;
      padding: 10px;
      padding-left: 20px;
    }
    .editor{
      min-width: 50%;
    }
  }
  .openButtonClass{
    height: 60px;
    width: 30px;
    background: $black;
    position:fixed;
    left: 0;
    top: calc(50vh - 30px);
    line-height: 60px;
    font-size: 22px;
    text-align: right;
    color:white;
    padding-right: 7px;
    box-shadow: 5px 0 10px  rgba(0, 0, 0, .12);
    border-radius: 0 3px 3px 0;
    transition: all 0.3s cubic-bezier(0.19, 0.45, 0.53, 0.95);
    z-index: 100000;
    opacity: 0.3;
    &:hover{
      opacity: 1;
    }
  }
}
</style>
