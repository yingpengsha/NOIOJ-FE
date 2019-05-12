<template>
  <div id="ladderProblem">
    <router-link tag="div" to="/ladder" class="backButton"><i class="el-icon-caret-left"></i>天梯竞赛</router-link>
    <section class="timeBar done" v-if="isDone">
      本场挑战已结束
    </section>
    <section class="timeBar" v-else>
      本次挑战已经开始，还剩余 {{time}} 结束
    </section>
    <h1>{{problem.title}}</h1>

    <section v-html="problem.description"></section>

    <section class="editor">
      <editor :problemId="problem.problemId" :challengeId="problem.challengeId" @onSubmit="onSubmit"/>
    </section>

    <section class="submit">
      <p class="title">提交记录</p>
      <el-table
        :data="submitLog"
        v-loading="submitLoading"
        border
        stripe>
        <el-table-column
          prop="title"
          label="题目名"
          align="center">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column
          prop="inDate"
          label="上传时间"
          align="center">
          <template slot-scope="scope">
            {{scope.row.inDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          label="结果"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-tag :type="resultList[scope.row.result].type">
              {{resultList[scope.row.result].en}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="运行时间"
          align="center"
          width="100">
          <template slot-scope="scope">
            {{`${scope.row.time} ms`}}
          </template>
        </el-table-column>
        <el-table-column
          prop="memory"
          label="内存消耗"
          align="center"
          width="100">
          <template slot-scope="scope">
            {{scope.row.memory | memoryFilter}}
          </template>
        </el-table-column>
        <el-table-column
          prop="language"
          label="语言"
          align="center"
          width="100">
          <template slot-scope="scope">
            {{language[scope.row.language]}}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.limit"
        layout="prev, pager, next, jumper"
        :total="submitTotal"
        v-show="submitTotal > this.listQuery.limit"
        style="width:300px;">
      </el-pagination>
    </section>

  </div>
</template>

<script>
import * as ladder from '@/api/ladder';
import Editor from '@/components/monaco-editor/index.vue';
import * as utils from '@/utils/index';
import { resultList, language } from '@/utils/OJ';

export default {
  name: 'LadderProblem',
  data() {
    return {
      problem: {},
      endTime: null,
      time: null,
      isDone: false,
      listQuery: {
        limit: 5,
        page: 1,
        challengeId: null,
      },
      submitLog: [],
      submitLoading: true,
      submitTotal: 0,
      resultList,
      language,
    };
  },
  methods: {
    getData() {
      ladder.query()
        .then((result) => {
          if (result.code) {
            this.problem = result.data;
            this.listQuery.challengeId = result.data.challengeId;
            this.getSubmitLog();
            this.endTime = new Date(Number(new Date(result.data.startTime)) + 900000);
            this.countDown();
          } else {
            this.$router.push({ name: 'ladder' });
          }
        });
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getSubmitLog(this.status.contestId);
    },
    getSubmitLog() {
      this.submitLoading = true;
      ladder.submitLog(this.listQuery)
        .then((result) => {
          if (result.data) {
            this.submitLog = result.data.list;
            this.submitTotal = result.data.totalCount;
          }
          this.submitLoading = false;
        });
    },
    countDown() {
      if (new Date() > new Date(this.endTime)) {
        console.log('倒计时结束');
        this.exit();
        return;
      }
      this.time = utils.formatSecond(Math.ceil(parseInt(new Date(this.endTime) - new Date(), 0) / 1000));
      const count = window.setInterval(() => {
        if (new Date() > new Date(this.endTime)) {
          console.log('倒计时结束');
          window.clearInterval(count);
          this.exit();
        }
        const time = Math.ceil(parseInt(new Date(this.endTime) - new Date(), 0) / 1000);
        this.time = utils.formatSecond(time);
      }, 1000);
    },
    exit() {
      this.isDone = true;
      this.$message({
        message: '本场挑战时间已到，十秒后将退出本次挑战。',
        type: 'warning',
      });
      window.setTimeout(() => {
        this.$router.push({ name: 'ladder' });
      }, 10000);
    },
    onSubmit() {
      this.getSubmitLog();
    },
  },
  created() {
    this.getData();
  },
  components: {
    Editor,
  },
  filters: {
    parseTime(date) {
      return utils.parseTime(date, '{y}-{m}-{d}');
    },
    memoryFilter(memory) {
      if (memory < 1024) {
        return `${memory} KB`;
      }
      return `${(memory / 1024).toFixed(1)} MB`;
    },
  },
};
</script>

<style lang="scss" scoped>
#ladderProblem{
  width: $detailWidth;
  height: 100%;
  margin:0 auto;
  padding:30px;
  .timeBar{
    width:100%;
    height: 70px;
    font-size: 18px;
    margin-top: 20px;
    letter-spacing: 1px;
    font-weight: 300;
    line-height: 70px;
    padding:0 30px;
    background: white;
    border-radius: 3px;
    border:1px solid $borderOne;
    border-left: 5px solid #67C23A;
  }
  .done{
    border-left: 5px solid #F56C6C;
  }
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
  .submit{
    .title{
      font-size: 24px;
    }
  }
}
</style>
