<template>
  <div id="matchProblem">
    <router-link tag="div" to="/match/detail" class="backButton"><i class="el-icon-caret-left"></i>竞赛详情</router-link>
    <h1>{{problem.title}}</h1>
    <section v-html="problem.description"></section>
    <section class="editor">
      <editor :problemId="problem.problemId" :contestId="$route.query.contestId" @onSubmit="onSubmit"/>
    </section>
  </div>
</template>

<script>
import * as problem from '@/api/problem';
import Editor from '@/components/monaco-editor/index.vue';

export default {
  name: 'MatchProblem',
  data() {
    return {
      problem: {},
      bodyLoading: true,
    };
  },
  methods: {
    getData() {
      this.bodyLoading = true;
      problem.queryById(this.$route.params.id)
        .then((result) => {
          if (result.code === 1) {
            this.problem = result.data;
          }
          this.bodyLoading = false;
        });
    },
    onSubmit() {
      this.$router.push({ name: 'MatchDetail', params: { id: this.$route.query.contestId } });
    },
  },
  created() {
    this.getData();
  },
  components: {
    Editor,
  },
};
</script>

<style lang="scss" scoped>
#matchProblem{
  width: $detailWidth;
  height: 100%;
  margin:0 auto;
  padding:30px;
  .backButton{
    font-size: 16px;
    color: $fontThree;
    letter-spacing: 3px;
    &:hover{
      cursor: pointer;
    }
  }
  .editor{
    height: 700px;
    padding: 30px 0;
  }
}
</style>
