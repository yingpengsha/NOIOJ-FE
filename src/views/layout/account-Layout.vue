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
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            题库<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-tickets" @click.native="handleToProblem()">
              全部题目
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-menu" @click.native="handleToPackage()">
              全部题包
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            竞赛<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleToMatch()">
              <svg-icon icon-class="match" class-name="menu-icon"></svg-icon> 公开竞赛
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleToLadder()">
              <svg-icon icon-class="battle" class-name="menu-icon"></svg-icon> 天梯竞技
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <router-link tag="a" to="/rank">排行榜</router-link>
        <router-link tag="a" to="/lesson">在线课程</router-link>
        <router-link tag="a" to="/questions">常见问题</router-link>
      </section>

      <section class="loginStatus">
        <div class="login" v-if="!isLogin">
          <el-button type="primary" size="small" @click="handleToLogin()">登录</el-button>
          <el-button size="small" @click="handleToRegister()">注册</el-button>
        </div>
        <div class="user" v-else>
          <img :src="avator || defaultAvator" class="avator" @click="handleToUserIndex" />
          <i class="el-icon-arrow-down"></i>
        </div>
      </section>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import defaultAvator from '@/assets/public/avator.png';

export default {
  name: 'Layout',
  data() {
    return {
      defaultAvator,
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
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
    handleToUserIndex() {
      this.$router.push({ name: 'userIndex' });
    },
    handleToMatch() {
      this.$router.push({ name: 'match' });
    },
    handleToLadder() {
      this.$router.push({ name: 'ladder' });
    },
    handleToProblem() {
      this.$router.push({ name: 'problem' });
    },
    handleToPackage() {
      this.$router.push({ name: 'problemPackage' });
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
        fill:$grayBack;
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
      .el-dropdown-link{
        color: #888894;
        transition: all .3s;
        &:hover{
          cursor: pointer;
          color:white;
        }
      }
      .menu-icon{
        width:30px;
        height: 30px;
      }
      a{
        font-size: 15px;
        color:#888894;
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
      .user{
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: white;
        .avator{
          width: 32px;
          height: 32px;
          background: white;
          margin-right: 10px;
          border-radius: 50%;
        }
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
