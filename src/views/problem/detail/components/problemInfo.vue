<template>
  <div class="problemInfo">
    <div class="description">
      <h2>描述</h2>
      <p v-html="problem.description"></p>
    </div>
    <div class="example">
      <h2>样例</h2>
      <h4>输入</h4>
      <p v-html="problem.input"></p>
      <h4>输出</h4>
      <p v-html="problem.output"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemInfo',
  props: {
    problem: Object,
  },
};
</script>

<style lang="scss" scoped>
.problemInfo{
  height: calc(100vh - 120px - 80px - 40px - 15px);
  width: 100%;
  padding: 0 10px;
  overflow:scroll;
  .example{
    p{
      font-size: 14px;
      padding: 5px 10px;
      background: #f6f8fa;
      color:$fontTwo;
    }
  }
}
</style>
