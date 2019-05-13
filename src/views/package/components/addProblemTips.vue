<template>
  <el-card>
    <div>
      <svg-icon icon-class="tips" class-name="icon" />
    </div>
    <div>
      <p>为了使您的题包更加全面，我们希望可以看到不同的题目</p>
      <div class="line"></div>
      <h4>1. 好的题名往往简洁，描述性强并且明确。</h4>
      <h5>例如</h5>
      <p>找出最短无序连续子数组</p>
      <h4>2. 请清晰地描述您的题目，并尽可能确保您的题目和力扣现有题目没有重复</h4>
      <h5>例如</h5>
      <p>给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。</p>
      <p>你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。</p>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AddProblemTips',
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
  },
};
</script>

<style lang="scss" scoped>
    .icon{
      height: 40px;
      width: 40px;
    }
    .line{
      height:2px;
      width: 100%;
      background: #E4E7ED;
    }
    p{
      color:$fontThree;
      font-size: 14px;
    }
    p:first-of-type{
      font-weight: bold;
      font-size: 16px;
      color:#000;
    }
</style>
