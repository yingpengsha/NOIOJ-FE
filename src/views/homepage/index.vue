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
            <el-button type="success" class="button">开始做题</el-button>
            <div class="button register" @click="handleToRegister">注册加入平台</div>
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
            <h1>练习</h1>
            <p>LintCode领扣上有数量超过1000道的算法题目和人工智能题目，通过刷题熟练掌握数据结构和算法。
              完成各大名企的阶梯训练，为你斩获心仪的offer打下坚实的基础</p>
          </div>
        </div>
        <div class="feature">
          <svg-icon icon-class="team" class-name="icon" />
          <div class="detail">
            <h1>讨论</h1>
            <p>LintCode领扣上有数量超过1000道的算法题目和人工智能题目，通过刷题熟练掌握数据结构和算法。
              完成各大名企的阶梯训练，为你斩获心仪的offer打下坚实的基础</p>
          </div>
        </div>
        <div class="feature">
          <svg-icon icon-class="champion" class-name="icon" />
          <div class="detail">
            <h1>竞赛</h1>
            <p>LintCode领扣上有数量超过1000道的算法题目和人工智能题目，通过刷题熟练掌握数据结构和算法。
              完成各大名企的阶梯训练，为你斩获心仪的offer打下坚实的基础</p>
          </div>
        </div>
        <div class="feature">
          <svg-icon icon-class="class" class-name="icon" />
          <div class="detail">
            <h1>课程</h1>
            <p>LintCode领扣上有数量超过1000道的算法题目和人工智能题目，通过刷题熟练掌握数据结构和算法。
              完成各大名企的阶梯训练，为你斩获心仪的offer打下坚实的基础</p>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  methods: {
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
            background: #ddd;
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
