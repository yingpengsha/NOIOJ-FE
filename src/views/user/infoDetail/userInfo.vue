<template>
  <div id="basicInfo">
    <el-form :model="userInfo" status-icon :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="nick" style="width:500px">
        <el-input v-model="userInfo.nick"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="userInfo.sex" label="1">男生</el-radio>
        <el-radio v-model="userInfo.sex" label="0">女生</el-radio>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model="userInfo.birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="学校" prop="school" style="width:500px">
        <el-input v-model="userInfo.school"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" style="width:500px">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="经历" prop="experience" style="width:500px">
        <el-input type="textarea" :rows="4" v-model="userInfo.experience"></el-input>
      </el-form-item>
      <el-form-item label="签名" prop="introduce" style="width:500px">
        <el-input type="textarea" :rows="4" v-model="userInfo.introduce"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="getData">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as users from '@/api/users';

export default {
  name: 'BasicInfo',
  data() {
    return {
      userInfo: {
        nick: '',
        sex: 0,
        birthday: null,
        school: '',
        email: '',
        province: '',
        city: '',
        experience: '',
        introduce: '',
      },
      rules: {
        nick: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          users.updateUserInfo(this.userInfo)
            .then((result) => {
              if (result.code === '1') {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                });
              }
            });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    getData() {
      users.userInfo()
        .then((result) => {
          for (const key in this.userInfo) {
            if (this.userInfo.hasOwnProperty(key)) {
              this.userInfo[key] = result.data[key];
            }
          }
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
#basicInfo{
  width: 100%;
  .infoItem{
    width: 100%;
    height: 55px;
    padding: 17px;
    border-bottom: 1px solid $borderOne;
    display: flex;
    justify-content:space-between;
    font-size:14px;
    .title{
      width: 200px;
    }
    .detail{
      font-size:14px;
      width: 100%;
      line-height: 20px;
    }
    .el-button{
      width: 50px;
      padding:0;
    }
  }
}
</style>
