<template>
  <div id="basicInfo">
    <div class="infoItem" v-for="(item,key) in 8" :key="key">
      <div class="title">昵称</div>
      <div class="detail">昵称</div>
      <el-button type="text">修改</el-button>
    </div>
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
        introduce: '',
        sex: '',
        birthday: null,
        school: '',
        email: '',
        province: '',
        city: '',
        experience: '',
      },
    };
  },
  methods: {
    getData() {
      users.userInfo()
        .then((result) => {
          console.log(result.data);
          this.userInfo = result.data;
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
