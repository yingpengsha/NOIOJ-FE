<template>
  <div id="dataStatistics">
    <el-card class="box-card" :body-style="{ padding: '15px' }">
      <div class="title">提交记录</div>
      <submit-history />
    </el-card>

    <el-card class="box-card" :body-style="{ padding: '15px' }">
      <div class="title">算法能力</div>
      <algorithm-ability />
    </el-card>

    <h3>做题记录</h3>
    <submit-log />
  </div>
</template>

<script>
import SubmitHistory from './components/submitHistory.vue';
import AlgorithmAbility from './components/algorithmAbility.vue';
import SubmitLog from '../infoDetail/submitLog.vue';

export default {
  name: 'DataStatistics',
  components: {
    SubmitHistory,
    AlgorithmAbility,
    SubmitLog,
  },
};
</script>

<style lang="scss" scoped>
#dataStatistics{
  .box-card{
    margin-bottom:20px;
  }
  .title{
    font-size: 15px;
    color:$black;
    margin-bottom: 10px;
  }
}
</style>
