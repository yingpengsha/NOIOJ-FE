<template>
  <div id="MatchDetail">
    <router-link tag="div" to="/match/index" class="backButton"><i class="el-icon-caret-left"></i>竞赛主页</router-link>
    <h1>{{status.title}}</h1>
    <section class="timeBar done" v-if="isDone">
      本场竞赛已结束
    </section>
    <section class="timeBar" v-else>
      本场竞赛已经开始，还剩余 {{time}} 结束
    </section>

    <section class="rules">
      <div class="title">比赛规则</div>
      <div class="detail">
        <p>每场竞赛共4题，比赛为 1 小时 30 分钟。每道题根据难易度有不同的得分，答对题目数越多即得分越高，在得分相同的情况下，答题用时最短则排名越高。</p>
      </div>
    </section>

    <section class="main">
      <div class="problemList">
        <el-card class="box-card" :body-style="{ padding: '0px' }" v-loading="problemLoading">
          <div slot="header" class="clearfix">
            <span class="title">题目列表</span>
          </div>
          <div v-for="(item,key) in problemList" :key="key" class="problem" @click="handleToPorblem(item.problemId)">
            {{item.title}}
          </div>
        </el-card>
      </div>

      <div class="submitLog">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>提交记录</span>
          </div>
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
              width="130">
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
              width="80">
              <template slot-scope="scope">
                {{`${scope.row.time} ms`}}
              </template>
            </el-table-column>
            <el-table-column
              prop="memory"
              label="内存消耗"
              align="center"
              width="80">
              <template slot-scope="scope">
                {{scope.row.memory | memoryFilter}}
              </template>
            </el-table-column>
            <el-table-column
              prop="language"
              label="语言"
              align="center"
              width="80">
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
        </el-card>
      </div>
    </section>

    <section class="buttonList">
      <el-button type="danger" @click="exit">退出竞赛</el-button>
      <el-button type="primary" @click="finish">完成竞赛</el-button>
    </section>
  </div>
</template>

<script>
import * as match from '@/api/match';
import * as utils from '@/utils/index';
import { resultList, language } from '@/utils/OJ';

export default {
  name: 'MatchDetail',
  data() {
    return {
      status: {},
      problemList: [],
      submitLog: [],
      submitTotal: 0,
      time: null,
      bodyLoading: true,
      problemLoading: true,
      submitLoading: true,
      listQuery: {
        limit: 5,
        page: 1,
        contestId: 0,
      },
      isDone: false,
      resultList,
      language,
    };
  },
  methods: {
    handleToPorblem(id) {
      this.$router.push({ name: 'MatchProblem', params: { id }, query: { contestId: this.status.contestId } });
    },
    countDown() {
      if (new Date() > new Date(this.status.endTime)) {
        console.log('竞赛结束');
        this.isDone = true;
        return;
      }
      this.time = utils.formatSecond(Math.ceil(parseInt(new Date(this.status.endTime) - new Date(), 0) / 1000));
      const count = window.setInterval(() => {
        if (new Date() > new Date(this.status.endTime)) {
          console.log('竞赛结束');
          window.clearInterval(count);
          this.isDone = true;
        }
        const time = Math.ceil(parseInt(new Date(this.status.endTime) - new Date(), 0) / 1000);
        this.time = utils.formatSecond(time);
      }, 1000);
    },
    getData() {
      this.bodyLoading = true;
      match.query(this.$route.params.id)
        .then((result) => {
          if (result.code === 1) {
            this.bodyLoading = false;
            this.status = result.data;
            this.getList(this.status.contestId);
            this.getSubmitLog(this.status.contestId);
            this.countDown();
          } else {
            this.$router.push({ name: 'MatchDetail' });
          }
        });
    },
    getList(id) {
      this.problemLoading = true;
      match.queryProblem(id)
        .then((result) => {
          if (result.code === 1) {
            this.problemList = result.data.list;
            this.problemLoading = false;
          }
        });
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getSubmitLog(this.status.contestId);
    },
    getSubmitLog(id) {
      this.submitLoading = true;
      this.listQuery.contestId = id;
      match.solution(this.listQuery)
        .then((result) => {
          if (result.code === 1) {
            this.submitLog = result.data.list;
            this.submitTotal = result.data.totalCount;
          }
          this.submitLoading = false;
        });
    },
    exit() {
      match.exit(this.status.contestId)
        .then((result) => {
          if (result.code === 1) {
            this.$router.push({ name: 'match' });
            this.$notify({
              title: '成功',
              message: '已退出当前比赛',
              type: 'success',
            });
          }
        });
    },
    finish() {
      match.finish(this.status.contestId)
        .then((result) => {
          if (result.code === 1) {
            this.$router.push({ name: 'match' });
            this.$notify({
              title: '成功',
              message: '已完成当前比赛',
              type: 'success',
            });
          }
        });
    },
  },
  created() {
    this.getData();
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
#MatchDetail{
  width: $mainWidth;
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
  .timeBar{
    width:100%;
    height: 70px;
    font-size: 18px;
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
  .rules{
    margin: 30px 0;
    padding:10px 0;
    border-bottom: 1px solid $borderOne;
    .title{
      margin:10px 0;
      font-size: 30px;
      font-weight: 300;
    }
  }
  .main{
    display: flex;
    .problemList{
      width: 500px;
      margin-right: 20px;
      .title{
        font-size: 24px;
      }
      .problem{
        height: 60px;
        width: 500px;
        padding:0 20px;
        line-height: 60px;
        border-bottom: 1px solid $borderOne;
      }
    }
    .submitLog{
      width: calc(100% - 520px);
      .box-card{
        width:100%;
      }
    }
  }
  .buttonList{
    padding:10px 0;
    float: right;
  }
}
</style>
