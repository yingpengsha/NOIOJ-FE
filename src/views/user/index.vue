<template>
  <div id="userIndex">
    <main>
      <el-card class="avator" :body-style="{ padding: '0px' }">
        <img :src="avator || defaultAvator" class="image">
        <div style="padding: 18px;">
          <p class="nick">{{userInfo.nick}}</p>
          <p class="intro">{{userInfo.introduce}}</p>
          <div class="item">
            <svg-icon icon-class="email" class-name="icon" />
            <div class="detail">{{userInfo.email}}</div>
          </div>
          <div class="item">
            <svg-icon icon-class="school" class-name="icon" />
            <div class="detail">{{userInfo.school}}</div>
          </div>
          <el-button class="button" @click="handleToUserInfo()" plain>修改信息</el-button>
        </div>
      </el-card>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as users from '@/api/users';
import defaultAvator from '@/assets/public/avator.png';

export default {
  name: 'userIndex',
  data() {
    return {
      defaultAvator,
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
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
  },
  methods: {
    getData() {
      users.userInfo()
        .then((result) => {
          console.log(result.data);
          this.userInfo = result.data;
        });
    },
    handleToUserInfo() {
      this.$router.push({ name: 'userInfo' });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
#userIndex{
  width: 100%;
  main{
    width: $detailWidth;
    height: 100%;
    margin:0 auto;
    padding:30px;
    .avator{
      padding:0px;
      width: 280px;
      img{
        width: 280px;
        height: 280px;
      }
      .nick{
        text-align: center;
        font-size: 24px;
        margin: 0px;
        margin-bottom: 15px;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .intro{
        text-align: center;
        font-size: 14px;
        margin: 0px;
        margin-bottom: 18px;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item{
        height: 25px;
        padding:0px 5px;
        margin:3px 0px;
        line-height: 25px;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        .icon{
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        .detail{
          font-size: 15px;
          width:100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .button{
        margin-top:15px;
        width: 100%;
      }
    }
  }
}
</style>
