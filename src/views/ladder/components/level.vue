<template>
  <div id="ladderLevel">
    <main>
      <el-card class="box-card" shadow="hover" v-for="(item,key) in levels" :key="key">
        <div class="card-left">
          <svg-icon :icon-class="`level${item.value}`" class-name="levelIcon"/>
          <div class="levelName">
            <span>{{item.name}}</span>
            <span>{{item.leveldetail}}</span>
          </div>
        </div>
        <div class="card-right">
          <div class="rules">
            <span>每个小级别需要通过挑战数：4</span>
          </div>
          <div class="tips">
            <span>{{item.tips}}</span>
          </div>
        </div>
      </el-card>
    </main>
  </div>
</template>

<script>
export default {
  name: 'LadderLevel',
  data() {
    return {
      levels: [
        {
          name: '———青铜———',
          leveldetail: '青铜 I 青铜 II 青铜 III 青铜 IV',
          tips: '刚入门信奥练习的同学们，在这里我们会告诉你如何编程，如何编写for循环，如何编写函数，如何迭代整数数组。',
          value: 1,
        },
        {
          name: '———白银———',
          leveldetail: '白银 I 白银 II 白银 III 白银 IV',
          tips: '你可以和你的小伙伴炫耀你的编程技术了！',
          value: 2,
        },
        {
          name: '———黄金———',
          leveldetail: '黄金 I 黄金 II 黄金 III 黄金 IV',
          tips: '太厉害了！你已经有资格在竞赛上施展拳脚了。',
          value: 3,
        },
        {
          name: '———铂金———',
          leveldetail: '铂金 I 铂金 II 铂金 III 铂金 IV',
          tips: '信奥竞赛的舞台需要你！',
          value: 4,
        },
        {
          name: '———钻石———',
          leveldetail: '钻石 I 钻石 II 钻石 III 钻石 IV',
          tips: '恭喜！你一定是今年竞赛的王者。',
          value: 5,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#ladderLevel{
  width: $detailWidth;
  margin:auto;
  main{
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .box-card{
      width:80%;
      padding:20px 20px 40px 0px;
      padding-bottom: 40px;
      margin:20px 0;
      .card-left{
        float:left;
        width: 40%;
        border-right:1px solid #DCDFE6;
        .levelIcon{
          height:100px;
          width:138px;
          float:left;
        }
        .levelName{
          float:left;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding:30px 0;
          padding-right: 10px;
          span:first-child{
            font-size: 25px;
          }
          span:last-child{
            color:#606266
          }
        }
      }
      .card-right{
        float:right;
        width: 60%;
        padding:0 40px;
        .rules{
          margin-top:10px;
          font-size: 18px;
          color:rgb(144, 147, 153);
          margin-bottom: 20px;
        }
        .tips span{
          color:#E6A23C;
          font-size:18px
        }
      }
    }

  }
}
</style>
