<template>
  <div id="questions">
    <section id="header">
      <div class="img"/>
      <main>
        常见问题及解答
      </main>
    </section>

    <section id="main">
      <main>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'questions',
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
#questions{
  width:100%;
  main{
    width: $mainWidth;
    height: 100%;
    margin:0 auto;
    padding:30px;
  }
  #header{
    width:100%;
    height: 375px;
    position: relative;
    .img{
      width:100%;
      height: 375px;
      background: url('../../assets/questions-page/questions-background.png');
      background-position: center;
      background-size: cover;
      filter:brightness(0.5);
      position:absolute;
      top: 0;
      left: 0;
    }
    main{
      text-align: center;
      line-height: 315px;
      font-size: 48px;
      letter-spacing: 5px;
      color: white;
      position: relative;
    }
  }

  #main{
    background: white;
    main{
      .el-collapse-item__header{
        font-size: 20px;
      }
    }
  }
}
</style>
