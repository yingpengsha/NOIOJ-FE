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
  </div>
</template>

<script>
import * as ladder from '@/api/ladder';
import Editor from '@/components/monaco-editor/index.vue';
import * as utils from '@/utils/index';

export default {
  name: 'LadderProblem',
  data() {
    return {
      problem: {},
      endTime: null,
      time: null,
      isDone: false,
    };
  },
  methods: {
    getData() {
      ladder.query()
        .then((result) => {
          if (result.code) {
            this.problem = result.data;
            this.endTime = new Date(Number(new Date(result.data.startTime)) + 900000);
            this.countDown();
          } else {
            this.$router.push({ name: 'ladder' });
          }
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
      // this.$router.push({ name: 'MatchDetail', params: { id: this.$route.query.contestId } });
    },
  },
  created() {
    this.getData();
  },
  components: {
    Editor,
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
}
</style>
