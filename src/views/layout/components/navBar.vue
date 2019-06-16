<template>
  <header>
    <section class="logo">
      <svg-icon icon-class="NOI" class-name="icon" @click="handleToHomepage()" />
      <div class="line" />
      <span class="title" @click="handleToHomepage()">信奥训练平台</span>
      <el-dropdown style="float:right">
        <span class="el-dropdown-link">
          <svg-icon icon-class="QrCode" class-name="QrCode" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <img :src="QrCode" style="margin:0 10px;" width="180px" height="180px"/>
        </el-dropdown-menu>
      </el-dropdown>
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
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img :src="avator || defaultAvator" class="avator" />
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,key) in dropdownList"
              :key="key"
              :divided="item.divided"
              @click.native="item.method()">
              <span :style="item.style">
                {{item.title}}
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </section>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import defaultAvator from '@/assets/public/avator.png';
import QrCode from '@/assets/public/QrCode.png';

export default {
  name: 'NavBar',
  data() {
    return {
      defaultAvator,
      QrCode,
      dropdownList: [
        {
          title: '个人主页', divided: false, style: null, method: this.handleToUserIndex,
        },
        {
          title: '个人信息', divided: false, style: null, method: this.handleToUserInfo,
        },
        {
          title: '上传题目', divided: true, style: 'color:#0681FF', method: this.handleToUpload,
        },
        {
          title: '退出登录', divided: true, style: 'color:red', method: this.handleToLogout,
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
  },
  methods: {
    handleToUpload() {
      this.$router.push({ name: 'problemPackageUpload' });
    },
    handleToHomepage() {
      this.$router.push({ name: 'homepage' });
    },
    handleToLogin() {
      this.$router.push({ name: 'login' });
    },
    handleToLogout() {
      this.$store.dispatch('logout');
      this.handleToHomepage();
    },
    handleToRegister() {
      this.$router.push({ name: 'register' });
    },
    handleToUserIndex() {
      this.$router.push({ name: 'userIndex' });
    },
    handleToUserInfo() {
      this.$router.push({ name: 'userInfo' });
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
      color: white;
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
      color:white;
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
      .el-dropdown-link{
        display: flex;
        align-items: center;
        color: white;
        .avator{
          width: 35px;
          height: 35px;
          background: white;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
