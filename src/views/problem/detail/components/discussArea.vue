<template>
  <div class="discussArea">
    讨论区
  </div>
</template>

<script>
export default {
  name: 'DiscussArea',
  props: {
    problemId: Number,
  },
};
</script>

<style lang="scss" scoped>
.discussArea{
  height: calc(100vh - 120px - 80px - 40px - 15px);
  width: 100%;
  padding: 0 10px;
  overflow:scroll;
}
</style>
