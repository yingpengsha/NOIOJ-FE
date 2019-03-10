<template>
  <div id="layout">
    <header>
      <section class="logo">
        <svg-icon icon-class="NOI" class-name="icon" @click="handleToHomepage()" />
        <div class="line" />
        <span class="title" @click="handleToHomepage()">信奥训练平台</span>
        <svg-icon icon-class="QrCode" class-name="QrCode" />
      </section>

      <section class="menuList">
        <a>题库 <i class="el-icon-arrow-down"></i></a>
        <a>竞赛</a>
        <a>排行榜</a>
        <a>在线课程</a>
        <router-link tag="a" to="/problems">常见问题</router-link>
      </section>

      <section class="loginStatus">
        <div class="login">
          <el-button type="primary" size="small" @click="handleToLogin()">登录</el-button>
          <el-button size="small" @click="handleToRegister()">注册</el-button>
        </div>
      </section>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <!-- <footer>
      <main>
        <div class="logo"><svg-icon icon-class="NOI" class-name="icon" /></div>
        <span>&copy; 2019 信奥训练平台</span>
      </main>
    </footer> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Layout',
  computed: {
    ...mapGetters([
      'isLogin',
    ]),
  },
  methods: {
    handleToHomepage() {
      this.$router.push({ name: 'homepage' });
    },
    handleToLogin() {
      this.$router.push({ name: 'login' });
    },
    handleToRegister() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style lang="scss" scoped>
#layout{
  height: 100%;
  width: 100%;

  header{
    width: 100%;
    height: 60px;
    background: $black;
    display: flex;
    justify-content:space-between;
    .logo{
      .icon{
        fill: white;
        width: 40px;
        height: 30px;
        margin: 15px 30px;
        margin-right: 0px;
        position: relative;
        top: -2.5px;
        float: left;
      }
      .line{
        width:1px;
        height: 34px;
        margin: 13px 18px;
        background: white;
        float: left;
      }
      .title{
        line-height: 60px;
        color:white;
        font-size: 19px;
        letter-spacing: 3px;
        font-weight: bold;
      }
      .QrCode{
        width: 25px;
        height: 25px;
        margin: 17px 10px;
        float: right;
        fill: #888894;
      }
      .icon,.title{
        &:hover{
          cursor: pointer;
        }
      }
    }

    .menuList{
      width: 500px;
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content:space-between;
      a{
        font-size: 15px;
        color: #888894;
        transition: all .3s;
        &:hover{
          color: white;
        }
      }
    }

    .loginStatus{
      width: 284px;
      height: 60px;
      padding: 14px;
      .login{
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  main{
    width: 100%;
    height:calc(100% - 60px);
  }

  footer{
    width: 100%;
    height: 100px;
    text-align: center;
    background: $grayBack;
    main{
      width: $mainWidth;
      margin: auto;
      border-top: 1px solid gray;
      .logo{
        width: 40px;
        height: 60px;
        margin: auto;
        padding: 15px 0;
        .icon{
          fill: $black;
          width: 40px;
          height: 30px;
        }
      }
      span{
        color: $black;
        font-size: 14px;
      }
    }
  }
}
</style>
