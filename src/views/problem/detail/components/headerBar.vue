<template>
  <div class="header">
    <div>
      <el-button type="text" class="backButton" @click="handleToBack">
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <div class="title">{{problem.title}}</div>
      <div class="difficulty">难度 : <span :style="problem.difficulty | tagStyle">{{difficulty[problem.difficulty]}}</span></div>
    </div>

    <div class="submitRate">
      <div class="item">
        <div class="itemTitle">通过次数</div>
        <div class="itemDetail">{{problem.accepted}}</div>
      </div>

      <div class="item">
        <div class="itemTitle">提交次数</div>
        <div class="itemDetail">{{problem.submit}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    problem: Object,
  },
  data() {
    return {
      difficulty: ['入门', '简单', '中等', '困难', '超难'],
    };
  },
  methods: {
    handleToBack() {
      this.$router.go(-1);
    },
  },
  filters: {
    tagStyle(difficulty) {
      let style = 'color: ';
      switch (difficulty) {
        case 0:
          style += '#909399';
          break;
        case 1:
          style += '#67C23A';
          break;
        case 2:
          style += '#0681FF';
          break;
        case 3:
          style += '#E6A23C';
          break;
        case 4:
          style += '#F56C6C';
          break;
        default:
          break;
      }
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.header{
  height: 60px;
  width: 100%;
  background: white;
  box-shadow: 0 5px 10px  rgba(0, 0, 0, .12);
  position: relative;
  line-height: 60px;
  display: flex;
  justify-content:space-between;
  .backButton{
    width: 60px;
    height: 60px;
    font-size: 30px;
    color: $black;
    border-right: 1px solid $borderOne;
    float: left;
  }
  .title{
    margin: 0 30px;
    float: left;
  }
  .difficulty{
    color: $fontThree;
    font-size: 14px;
    float: left;
  }

  .submitRate{
    margin: 0 15px;
    display: flex;
    .item{
      width: 80px;
      height: 40px;
      line-height: 50px;
      margin:10px 0;
      div{
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        text-align: center;
      }
      .itemDetail{
        color: $fontTwo;
      }
    }
    .item:nth-of-type(1){
      border-right: 1px solid $borderTwo;
    }
  }
}
</style>
