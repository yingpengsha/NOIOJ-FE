<template>
  <div id="ladderRules">
    <main>
      <h1>什么是天梯竞技</h1>
      <p>天梯竞技是信奥训练平台发起的编程能力测试，参与者通过完成对编程题目的挑战，享受编程乐趣之余更可获得独一无二的证书以证明自己的编程及算法能力。立即报名开启编程挑战之旅，一起向着更高的目标进发吧！</p>
      <h1>天梯竞技规则</h1>
      <p>每个级别的挑战都包含一定数量的编程问题，比赛的题目为平台提供的编程问题。</p>
      <p>通过的题目数量达到四题后即可通过挑战获得本级别的证书，下一级别的挑战也将解锁。</p>
      <p>随着段位的提升编程问题的难度也逐渐增加，超过挑战时间即为挑战失败。</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'LadderRules',
};
</script>

<style lang="scss" scoped>
#ladderRules{
  width: $detailWidth;
  margin:auto;
  main{
    height: 100%;
  }
}
</style>
