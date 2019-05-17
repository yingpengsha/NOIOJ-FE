<template>
  <el-card class="rankCard" :body-style="{ padding: '0px' }">
    <div class="cardHead">
      我
    </div>
    <div class="cardMain" v-if="isLogin">
      <img :src="avator" width="180px" height="180px" />
      <div class="rank">
        <div>
          <p class="title">AC排名</p>
          <p class="detail">3981</p>
        </div>
        <div>
          <p class="title">天梯段位</p>
          <p class="detail">{{levelList[levelId]}}{{levelId ? 5-parseInt((acChallengeNum-(levelId-1)*16)/4) : null}}</p>
        </div>
      </div>
    </div>
    <div class="loginCard" v-else>
      <el-form
        :rules="rules"
        :model="loginForm"
        status-icon
        ref="loginForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="button">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleToLogin" class="button">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';
import * as user from '@/api/users';

export default {
  name: 'UserCard',
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!this.isRight) {
        callback(new Error(' '));
      }
      callback();
    };
    const checkPassword = (rule, value, callback) => {
      if (!this.isRight) {
        callback(new Error('账号或者密码错误！'));
      }
      callback();
    };
    return {
      levelList: ['尚未定级', '青铜', '白银', '黄金', '铂金', '钻石'],
      acChallengeNum: 0,
      levelId: 0,
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { validator: checkEmail },
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        password: [
          { validator: checkPassword },
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
      isRight: true,
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
  },
  methods: {
    handleToLogin() {
      this.$router.push({ name: 'register' });
    },
    getInfo() {
      user.userInfo()
        .then((result) => {
          console.log(result);
          this.acChallengeNum = result.data.acChallengeNum;
          this.levelId = result.data.levelId;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('login', this.loginForm);
          if (this.$store.getters.isLogin) {
            this.$router.push({ path: this.$route.params.history });
          } else {
            this.isRight = false;
            this.$refs.loginForm.validateField('email');
            this.$refs.loginForm.validateField('password');
          }
          return true;
        }
        console.error('error submit!!');
        return false;
      });
    },
  },
  created() {
    if (this.isLogin) {
      this.getInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
.rankCard{
  width: 360px;
  min-height: 300px;
  margin-bottom: 10px;
  .cardHead{
    width: 100%;
    height: 50px;
    color: white;
    background: $black;
    text-align: center;
    line-height: 50px;
    font-size: 17px;
  }
  .cardMain{
    img{
      border-radius: 50%;
      margin:30px 90px;
      border: 1px solid $black;
    }
    .rank{
      display: flex;
      justify-content:space-between;
      border-top: 1px solid $borderOne;
      background: #fdfdfd;
      div{
        width:50%;
        text-align: center;
        .title{
          color:$fontThree;
          font-size: 14px;
        }
        .detail{
          color:$fontTwo;
          font-size: 17px;
        }
        &:nth-of-type(2){
          border-left: 1px solid $borderOne;
        }
      }
    }
  }
  .loginCard{
    padding:30px;
    .button{
      width:100%;
      display: block;
    }
  }
}
</style>
