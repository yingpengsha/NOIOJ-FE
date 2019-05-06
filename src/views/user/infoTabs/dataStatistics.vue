<template>
  <div id="dataStatistics">
    <el-card class="box-card" :body-style="{ padding: '15px' }" v-loading="submitLoading">
      <div class="title">提交记录</div>
      <submit-history :chartData="submitList" :max="submitMax"/>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '15px' }">
          <div class="title">算法统计</div>
          <algorithm-statistic :max="algorithmMax" :chartData="classStatistic.slice(0,5)"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '15px' }">
          <div class="title">数据结构统计</div>
          <data-struct-statistic :max="structMax" :chartData="classStatistic.slice(5,9)"/>
        </el-card>
      </el-col>
    </el-row>

    <h3>做题记录</h3>
    <submit-log />
  </div>
</template>

<script>
import * as statistic from '@/api/infoStatistic';
import SubmitHistory from './components/submitHistory.vue';
import AlgorithmStatistic from './components/algorithmStatistic.vue';
import DataStructStatistic from './components/dataStructStatistic.vue';
import SubmitLog from '../infoDetail/submitLog.vue';
import * as utils from '@/utils';

export default {
  name: 'DataStatistics',
  data() {
    return {
      structMax: 0,
      algorithmMax: 0,
      classStatistic: new Array(8).fill(1),
      submitList: [],
      submitMax: 0,
      submitLoading: true,
    };
  },
  components: {
    SubmitHistory,
    AlgorithmStatistic,
    SubmitLog,
    DataStructStatistic,
  },
  methods: {
    getClassStatistic() {
      let structMax = 0;
      let algorithmMax = 0;
      statistic.classList()
        .then((result) => {
          result.data.forEach((element) => {
            this.classStatistic[element.classId] += element.count;
            algorithmMax = element.classId < 5 && element.count > algorithmMax ? element.count : algorithmMax;
            structMax = element.classId > 5 && element.count > structMax ? element.count : structMax;
          });
          console.log(this.classStatistic.slice(0, 5), this.classStatistic.slice(5, 9));
          this.structMax = structMax;
          this.algorithmMax = algorithmMax;
        });
    },
    getSubmitHistory() {
      let max = 0;
      statistic.submitList()
        .then((result) => {
          for (const key in result.data) {
            if (result.data.hasOwnProperty(key)) {
              const element = result.data[key];
              max = element.count > max ? element.count : max;
              const date = utils.parseTime(element.date, '{y}-{m}-{d}');
              this.submitList.push({
                value: [date, element.count],
                name: `${date} `,
              });
            }
          }
          this.submitMax = max;
          this.submitLoading = false;
        });
    },
  },
  created() {
    this.getSubmitHistory();
    this.getClassStatistic();
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
