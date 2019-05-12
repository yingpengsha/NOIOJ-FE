<template>
  <div id="ladder">
    <section class="header">
      <div class="img"/>
      <main>
        <p class="title">信奥天梯竞技</p>
        <p style="font-size:18px;margin-top:10px;">赶快加入天梯竞技和熟悉的同学或者陌生的对手一较高下吧！</p>
        <p style="font-size:24px;margin-top:60px;">你现在的段位</p>
        <p style="font-size:34px;margin:20px;">{{levelList[levelId]}}{{levelId ? 5-parseInt((acChallengeNum-(levelId-1)*16)/4) : null}}</p>
        <svg-icon :icon-class="`level${levelId}`" class-name="levelIcon"/>
        <p>下一级别已通过挑战数量: {{acChallengeNum % 4}}/4</p>
        <p v-if="status.code">挑战倒计时：{{this.time}}</p>
        <el-button type="success" class="button" @click="continueChallenge" v-if="status.code">继续挑战</el-button>
        <el-button type="primary" class="button" @click="startChallenge" v-else>开始挑战</el-button>
      </main>
    </section>

    <section class="rank">
      <header>
        <div
          v-for="(item,key) in menuList"
          :key="key"
          :class="focusItem===item.component?'focus':null"
          @click="handleToChangeItem(item.component)"
        >
          <span>{{item.title}}</span>
          <div class="line" />
        </div>
      </header>

      <Rank v-if="focusItem === 'Rank'" />
      <Rules v-if="focusItem === 'Rules'" />
      <Level v-if="focusItem === 'Level'" />
    </section>
  </div>
</template>

<script>
import * as user from '@/api/users';
import * as utils from '@/utils/index';
import * as ladder from '@/api/ladder';
import Rank from './components/rank.vue';
import Rules from './components/rules.vue';
import Level from './components/level.vue';

export default {
  name: 'Ladder',
  data() {
    return {
      levelId: 0,
      acChallengeNum: 0,
      levelList: ['尚未定级', '青铜', '白银', '黄金', '铂金', '钻石'],
      status: {},
      endTime: null,
      time: null,
      menuList: [
        { title: '排名', component: 'Rank' },
        { title: '规则', component: 'Rules' },
        { title: '段位介绍', component: 'Level' },
      ],
      focusItem: 'Rank',
    };
  },
  methods: {
    handleToChangeItem(item) {
      this.focusItem = item;
    },
    continueChallenge() {
      this.$router.push({ name: 'ladderProblem' });
    },
    startChallenge() {
      ladder.challenge()
        .then((result) => {
          if (result.code === 1) {
            this.$router.push({ name: 'ladderProblem' });
          }
        });
    },
    getData() {
      user.userInfo()
        .then((result) => {
          this.acChallengeNum = result.data.acChallengeNum;
          this.levelId = result.data.levelId;
        });
    },
    countDown() {
      console.log(this.endTime);
      if (new Date() > new Date(this.endTime)) {
        console.log('倒计时结束');
        this.status.code = 0;
        return;
      }
      this.time = utils.formatSecond(Math.ceil(parseInt(new Date(this.endTime) - new Date(), 0) / 1000));
      const count = window.setInterval(() => {
        if (new Date() > new Date(this.endTime)) {
          console.log('倒计时结束');
          window.clearInterval(count);
          this.status.code = 0;
        }
        const time = Math.ceil(parseInt(new Date(this.endTime) - new Date(), 0) / 1000);
        this.time = utils.formatSecond(time);
      }, 1000);
    },
    getStatus() {
      ladder.query()
        .then((result) => {
          this.status = result;
          if (result.code) {
            this.endTime = new Date(Number(new Date(result.data.startTime)) + 900000);
            this.countDown();
          }
        });
    },
  },
  created() {
    this.getData();
    this.getStatus();
  },
  components: {
    Rank,
    Rules,
    Level,
  },
};
</script>

<style lang="scss" scoped>
#ladder{
  width: 100%;
  main{
    width: $mainWidth;
    height: 100%;
    margin:0 auto;
    padding:30px;
  }
  .header{
    width:100%;
    height: calc(100vh - 60px);
    position: relative;
    .img{
      width:100%;
      height: 100%;
      background: url('../../assets/ladder-page/ladder-back.jpg');
      background-position: center;
      background-size: cover;
      filter:brightness(0.3);
      position:absolute;
      top: 0;
      left: 0;
    }
    main{
      text-align: center;
      color: white;
      font-weight: 300;
      position: relative;
      .title{
        font-size: 44px;
        letter-spacing: 5px;
        margin-bottom: 15px;
      }
      .levelIcon{
        font-size: 200px;
        display: block;
        margin: auto;
        margin-bottom: 30px;
      }
      .button{
        width: 200px;
        height: 50px;
        font-size: 18px;
        letter-spacing: 3px;
      }
    }
  }
  .rank{
    min-height: calc(100vh - 100px);
    header{
      display: flex;
      justify-content: center;
      div{
        width: 200px;
        text-align: center;
        font-size: 30px;
        font-weight: 300;
        margin: 30px 30px;
        padding-bottom: 15px;
        transition: all .3s;
        position: relative;
        &:hover{
          color: $blue;
          cursor: pointer;
        }
        .line{
          height:2px;
          width:0%;
          background:$blue;
          margin:0px;
          padding:0px;
          position:absolute;
          bottom: 0px;
          left: 0px;
          transform: all .3s;
        }
      }
      .focus{
        color: $blue;
        .line{
          width: 100%;
        }
      }
    }
  }
}
</style>
