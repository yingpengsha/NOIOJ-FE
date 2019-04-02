<template>
  <el-card class="rankCard" :body-style="{ padding: '0px' }">
    <div class="cardHead">
      我
    </div>
    <div class="cardMain">
      <img :src="avator" width="180px" height="180px" />
      <div class="rank">
        <div>
          <p class="title">AC排名</p>
          <p class="detail">3981</p>
        </div>
        <div>
          <p class="title">天梯段位</p>
          <p class="detail">青铜一</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserCard',
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.rankCard{
  width: 360px;
  min-height: 300px;
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
}
</style>
