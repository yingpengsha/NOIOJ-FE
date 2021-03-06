/* eslint-disable max-len */
<template>
  <div id="match">
    <section id="header">
      <div class="img"/>
      <main>
        <p>随机开始一场 模拟竞赛</p>
        <el-button type="success" class="button" @click="continueMatch" v-if="status">继续竞赛</el-button>
        <el-button type="info" class="button" @click="startMatch" v-else>开始竞赛</el-button>
        <br/>
      </main>
    </section>

    <section id="intro">
      <el-card class="box-card">
        <div class="text item">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;模拟竞赛在形式和题量上接近NOI竞赛，通过模拟竞赛，
            同学们在学习上的弱点和不足以及自己复习的漏洞清楚地表现出来，还可以正确的评估自己的水平。
            同时同学们也锻炼了自己的竞赛心态和竞赛技巧，训练自己的答题规范化和适应竞赛压力积累考试经验，
            让同学快速进入考试状态。通过竞赛历史可以把错题整理出来，经常翻看，从而有效地防止“一错再错”的现象。</p>
        </div>
      </el-card>
    </section>

    <section id="rank">
      <div class="rank" v-loading="rankLoading">
        <div class="title">
          <svg-icon icon-class="rank" class-name="icon" />
          <span>竞赛排行</span>
        </div>
        <div class="header">
          <div class="top top-2">
            <img :src="rankList[1] ? rankList[1].image : Seat" />
          </div>
          <div class="top top-1">
            <img :src="rankList[0] ? rankList[0].image : Seat" />
          </div>
          <div class="top top-3">
            <img :src="rankList[2] ? rankList[2].image : Seat" />
          </div>
        </div>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <el-table
            :height="336"
            :data="rankList.slice(3)"
            :show-header="false"
            style="width: 100%">
            <el-table-column
              type="index"
              :index="indexrank"
              align="center">
            </el-table-column>
            <el-table-column
              prop="nick"
              align="center">
            </el-table-column>
            <el-table-column
              prop="count"
              align="center">
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <div class="history">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span class="title">竞赛历史</span>
          </div>
          <el-table
            :height="520"
            :data="history"
            stripe
            v-loading="historyLoading"
            @row-click="matchDetail"
            style="width: 100%">
            <el-table-column
              prop="title"
              label="名称"
              align="center"
              width="140px">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="开始时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="source"
              align="center"
              label="分数"
              width="140px">
            </el-table-column>
          </el-table>
          <el-pagination
            v-show="historyTotal>0"
            :current-page="historyQuery.page"
            :page-size="historyQuery.limit"
            :total="historyTotal"
            layout="prev, pager, next"
            @size-change="handleHistorySizeChange"
            @current-change="handleHistoryCurrentChange">
          </el-pagination>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script>
import * as match from '@/api/match';
import Seat from '@/assets/match-page/seat.png';

export default {
  name: 'Match',
  data() {
    return {
      Seat,
      rankList: [],
      history: [],
      status: null,
      historyQuery: {
        limit: 10,
        page: 1,
      },
      historyTotal: 0,
      historyLoading: true,
      rankQuery: {
        limit: 10,
        page: 1,
      },
      rankLoading: true,
      statusLoading: true,
    };
  },
  methods: {
    indexrank(index) {
      return index + 4;
    },
    startMatch() {
      match.create()
        .then((result) => {
          this.$router.push({ name: 'MatchDetail', params: { id: result.data } });
          this.$notify({
            title: '成功',
            message: '竞赛已经开始，时间 1 小时 30 分钟。',
            type: 'success',
          });
        });
    },
    continueMatch() {
      this.$router.push({ name: 'MatchDetail', params: { id: this.status.contestId } });
    },
    matchDetail(row) {
      this.$router.push({ name: 'MatchDetail', params: { id: row.contestId } });
    },
    getHistory() {
      this.historyLoading = true;
      match.history(this.historyQuery)
        .then((result) => {
          if (result.code === 1) {
            this.history = result.data.list;
            this.historyTotal = result.data.totalCount;
          }
          this.historyLoading = false;
        });
    },
    getRank() {
      this.rankLoading = true;
      match.rank(this.rankQuery)
        .then((result) => {
          if (result.code === 1) {
            this.rankList = result.data.list;
          }
          this.rankLoading = false;
        });
    },
    getStatus() {
      this.statusLoading = true;
      match.status()
        .then((result) => {
          console.log(result);
          if (result.code === 1) {
            this.status = result.data;
          }
          this.statusLoading = false;
        })
        .catch(() => {
          this.statusLoading = false;
        });
    },
    handleHistorySizeChange(val) {
      this.historyQuery.limit = val;
      this.getHistory();
    },
    handleHistoryCurrentChange(val) {
      this.historyQuery.page = val;
      this.getHistory();
    },
  },
  created() {
    this.getHistory();
    this.getRank();
    this.getStatus();
  },
};
</script>

<style lang="scss" scoped>
#match{
  width:100%;
  main{
    width: $mainWidth;
    height: 100%;
    margin:0 auto;
    padding:30px;
  }
  #header{
    width:100%;
    height: 425px;
    background: $black;
    border-top: 1.5px solid $fontOne;
    position: relative;
    .img{
      width:100%;
      height: 425px;
      background: url('../../assets/match-page/match-back.jpg');
      background-position: center;
      background-size: cover;
      filter:brightness(0.5);
      position:absolute;
      top: 0;
      left: 0;
    }
    main{
      text-align: center;
      font-size: 48px;
      letter-spacing: 5px;
      color: white;
      font-weight: 300;
      position: relative;
      .button{
        width: 200px;
        height: 50px;
        font-size: 18px;
        letter-spacing: 3px;
      }
    }
  }
  #intro{
    width:950px;
    margin: auto;
    margin-top: -80px;
    position: relative;
  }
  #rank{
    width:950px;
    margin: auto;
    margin-top:30px;
    padding-bottom: 30px;
    display: flex;
    .rank{
      width: 45%;
      padding-right: 50px;
      .title{
        margin: 20px 0 30px 0;
        font-size:28px;
        color:#bdc3c7;
        .icon{
          font-size: 44px;
          margin-right: 10px;
        }
      }
      .header{
        width:100%;
        display: flex;
        justify-content:space-around;
        margin-bottom: 20px;
        padding: 0 20px;
        .top{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          text-align: center;
          img{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin-top: 5px;
          }
        }
        .top-1{
          background: linear-gradient(#feea88, #d7a807);
        }
        .top-2{
          margin-top: 80px;
          background: linear-gradient(white, #ababab);
        }
        .top-3{
          margin-top: 80px;
          background: linear-gradient(#facfa3, #d77c44);
        }
      }
    }
    .history{
      width:55%;
      .box-card{
        height: 100%;
      }
      .title{
        font-size: 24px;
      }
    }
  }
}
</style>
