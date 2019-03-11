<template>
  <div id="login">
    <main>
      <div class="login">
        <div class="header">
          <svg-icon icon-class="NOI" class-name="icon" @click="handleToHomepage()" />
        </div>
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
        </el-form>
        <div>
          <el-button type="text" class="register" @click="handleToRegister()">用户注册</el-button>
        </div>
        <div class="other">
          <p>第三方登录</p>
          <svg-icon icon-class="wechat" class-name="wechatIcon" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Login',
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
  methods: {
    handleToRegister() {
      this.$router.push({ name: 'register' });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('login', this.loginForm);
          if (this.$store.getters.isLogin) {
            this.$router.push({ name: 'homepage' });
          } else {
            this.isRight = false;
            this.$refs.loginForm.validateField('email');
            this.$refs.loginForm.validateField('password');
          }
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login{
  width: 100%;
  height: 100%;
  background: $grayBack;
  main{
    width: $mainWidth;
    height: 100%;
    margin:0 auto;
    padding:30px;
    .login{
      height: 450px;
      width:400px;
      margin:120px auto 0 auto;
      padding: 30px;
      background: white;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 20px 0px;
      .header{
        width: 50px;
        height: 50px;
        margin: 10px auto 20px auto;
        .icon{
          height: 50px;
          width:50px;
          margin: auto;
        }
      }
      .button{
        width: 100%;
      }
      .register{
        padding:0;
      }
      .other{
        color: $fontThree;
        font-size:14px;
        text-align:center;
        margin-top:40px;
        .wechatIcon{
          height:25px;
          width:25px;
          color: $fontThree;
          transition: all 0.3s;
          &:hover{
            color:#3eb94e;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
