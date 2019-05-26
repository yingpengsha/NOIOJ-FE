<template>
  <div id="welcome">
    <section class="intro">
      <main>
        <div class="detail">
          <h1>一个针对<br/>信息学竞赛选手<br/>的练习平台</h1>
          <p>上百道信息学题目等你来解答</p>
          <p>并且拥有专业的在线编辑器方便你的学习</p>
          <p>赶快让自己的名字出现在排行榜上吧！</p>
          <div class="buttonList">
            <el-button type="success" class="button" @click="handleToProblem">开始做题</el-button>
            <div class="button register" @click="handleToRegister" v-if="!isLogin">注册加入平台</div>
          </div>
        </div>
        <img src="@/assets/welcome-page/homepage.png" alt="homepage">
      </main>
    </section>

    <section class="features">
      <main>
        <div class="title">在信奥训练平台你能做什么？</div>
        <div class="feature">
          <svg-icon icon-class="code" class-name="icon" />
          <div class="detail">
            <h1>{{code.title}}</h1>
            <p>{{code.info}}</p>
          </div>
        </div>
        <div class="feature">
          <svg-icon icon-class="team" class-name="icon" />
          <div class="detail">
            <h1>{{team.title}}</h1>
            <p>{{team.info}}</p>
          </div>
        </div>
        <div class="feature">
          <svg-icon icon-class="champion" class-name="icon" />
          <div class="detail">
            <h1>{{champion.title}}</h1>
            <p>{{champion.info}}</p>
          </div>
        </div>
        <div class="feature">
          <svg-icon icon-class="class" class-name="icon" />
          <div class="detail">
            <h1>{{test.title}}</h1>
            <p>{{test.info}}</p>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Homepage',
  data() {
    return {
      code: {
        title: '练习',
        info: '信奥训练平台上有数量超过1000道的算法题。使用的是微软提供的开源编辑器，无需配置环境，就能开发、学习，还提供代码高亮，代码提示，代码搜索等，让在线代码编辑更友好。让学生通过刷题熟练掌握数据结构和算法。在信奥竞赛上取得佳绩',
      },
      team: {
        title: '讨论',
        info: '在每一道题目和每一个视频下面我们都设置了专门的讨论区，学生可以发布评论，发表看法，学生们之间的讨论交互也增加用户之间的粘度。',
      },
      champion: {
        title: '竞赛',
        info: '参加在线模拟信奥竞赛赢得积分，提高自己在排行榜上的排名。让学生可以检验自己的学习成果，考验自己的水平，训练自己对在竞赛过程中的节奏。',
      },
      test: {
        title: '课程',
        info: '信奥训练平台提供了丰富的视频教程资源。并且富有交互性和趣味性，你还可以叫上你的小伙伴，让我们一起来编程吧！',
      },
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
  },
  methods: {
    handleToProblem() {
      this.$router.push({ name: 'problem' });
    },
    handleToRegister() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style lang="scss" scoped>
#welcome{
  width:100%;
  main{
    width: $mainWidth;
    height: 100%;
    margin:0 auto;
    padding:30px;
  }
  .intro{
    width: 100%;
    height: 674px;
    background: $blue;
    main{
      display: flex;
      justify-content:space-between;
      .detail{
        max-width: 400px;
        padding: 80px 0;
        h1{
          font-size: 44px;
          color: white;
          margin: 20px 0;
          letter-spacing: 2px;
        }
        p{
          font-size: 18px;
          color: white;
          margin: 3px 0;
          letter-spacing: .5px;
        }
        .buttonList{
          margin-top:30px;
          .register{
            width: 180px;
            height: 44px;
            margin-left: 15px;
            background: white;
            float: right;
            border-radius: 3px;
            text-align: center;
            line-height: 17px;
            transition: all .3s;
            &:hover{
              cursor: pointer;
              background: white;
            }
          }
          .button{
            font-size:16px;
            padding:13px 35px;
          }
        }
      }
    }
  }

  .features{
    width: 100%;
    padding: 20px 0;
    background: white;
    main{
      .title{
        font-size: 32px;
        text-align: center;
      }
      .feature{
        width: 1000px;
        margin: 30px auto 0 auto;
        .detail{
          padding:20px 0;
          h1{
            font-size: 28px;
            margin-top:0;
            margin-bottom: 15px;
          }
        }
        .icon{
          height: 150px;
          width: 150px;
          margin: 0 40px;
          float: left;
        }
      }
    }
  }
}
</style>
