<template>
  <el-card>
    <div>
      <svg-icon icon-class="tips" class-name="icon" />
    </div>
    <div>
      <p>题包已经上传啦~快来为题包添加题目吧</p>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProblemTips',
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
    p:first-of-type{
      font-weight: bold;
      font-size: 16px;
    }
    p:nth-of-type(2){
      color:$fontThree;
      font-size: 14px;
    }
</style>
