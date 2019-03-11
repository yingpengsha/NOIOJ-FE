<template>
  <div id="register">
    <main>
      <div class="register">
        <div class="header">
          <svg-icon icon-class="NOI" class-name="icon" @click="handleToHomepage()" />
        </div>
        <el-form
          :rules="rules"
          :model="registerForm"
          status-icon
          ref="registerForm"
          label-width="0px"
          class="demo-ruleForm"
        >
          <el-form-item prop="email">
            <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="nick">
            <el-input v-model="registerForm.nick" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input
              type="password"
              v-model="registerForm.checkPassword"
              placeholder="重复密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('registerForm')"
              class="button"
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <span style="font-size:14px;color:#909399">已有账号？</span>
          <el-button type="text" class="login" @click="handleToLogin()">登录</el-button>
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
import * as users from '@/api/users';

export default {
  name: 'Register',
  data() {
    const verifyPassword = (rule, value, callback) => {
      if (this.registerForm.password !== this.registerForm.checkPassword) {
        this.$refs.registerForm.validateField('checkPassword');
      }
      callback();
    };
    const verifyCheckPassword = (rule, value, callback) => {
      if (this.registerForm.password !== this.registerForm.checkPassword) {
        callback(new Error('两次输入的密码不一致！'));
      }
      callback();
    };
    return {
      registerForm: {
        email: '',
        nick: '',
        password: '',
        checkPassword: '',
        defunct: 'N',
        volume: '0',
        language: '0',
        school: '绍兴文理学院',
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        password: [
          { validator: verifyPassword, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
        ],
        checkPassword: [
          { validator: verifyCheckPassword, trigger: ['blur', 'change'] },
          { required: true, message: '请重复密码', trigger: ['blur', 'change'] },
        ],
      },
      accountIsDone: false,
    };
  },
  methods: {
    handleToLogin() {
      this.$router.push({ name: 'login' });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await users.register(this.registerForm)
            .then((result) => {
              switch (result.data.code) {
                case '0':
                  this.$refs[formName].resetFields();
                  this.$message.error('该邮箱已被注册！');
                  break;
                case '1':
                  this.$message({
                    message: '恭喜你，注册成功',
                    type: 'success',
                  });
                  this.$router.push({ name: 'homepage' });
                  break;
                default:
                  break;
              }
            });
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
#register{
  width: 100%;
  height: 100%;
  background: $grayBack;
  main{
    width: $mainWidth;
    height: 100%;
    margin:0 auto;
    padding:30px;
    .register{
      height: 540px;
      width:400px;
      margin:100px auto 0 auto;
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
      .login{
        padding:0;
      }
      .other{
        color: $fontThree;
        font-size:14px;
        text-align:center;
        margin-top:25px;
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
