<template>
  <div id="userIndex">
    <main>
      <el-card class="avator" :body-style="{ padding: '0px' }">
        <img src="https://avatars3.githubusercontent.com/u/37143265?s=400&u=018d8991e2ad6feb2cfb5f2c3013031308ddca7e&v=4" class="image">
        <div style="padding: 18px;">
          <p class="nick">yingpengsha</p>
          <p class="intro">这是一段签名这是一段签名这是一段签名这是一段签名</p>
          <div class="item">
            <svg-icon icon-class="email" class-name="icon" />
            <div class="detail">810998652@qq.com</div>
          </div>
          <div class="item">
            <svg-icon icon-class="school" class-name="icon" />
            <div class="detail">绍兴文理学院</div>
          </div>
          <el-button class="button" plain>修改信息</el-button>
        </div>
      </el-card>
    </main>
  </div>
</template>

<script>
export default {
  name: 'userIndex',
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
