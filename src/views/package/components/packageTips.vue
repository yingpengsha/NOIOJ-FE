<template>
  <el-card>
    <div>
      <svg-icon icon-class="tips" class-name="icon" />
    </div>
    <div>
      <p>为了更好地了解题包，我们希望看到关于题包的解释。</p>
      <h3>例如</h3>
      <p>在Google新生职位的现场面试中，我遇到了这组题目。面试官给了45分钟来解这组面试题。</p>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PackageTips',
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
