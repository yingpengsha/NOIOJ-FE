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
          <el-collapse-item name="1">
            <template slot="title">
              <h2>{{questionList.title}}</h2>
            </template>
            <div v-for="(infos,key) in questionList.infoList" :key="key" class="reply">
              <div class="status"><el-tag :type="infos.type" size="medium">{{infos.en}}</el-tag></div>
              <div class="mean">{{infos.cn}}</div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <h2>{{judgement.title}}</h2>
            </template>
            <div class="fontClass">{{judgement.info}}</div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <h2>{{browser.title}}</h2>
            </template>
            <div class="fontClass">{{browser.info}}</div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <h2>{{test.title}}</h2>
            </template>
            <div class="fontClass">{{test.info}}</div>
          </el-collapse-item>
        </el-collapse>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      questionList: {
        title: '系统返回信息都是什么意思?',
        infoList: [
          { en: 'Pending', cn: '系统忙，你的答案在排队等待', type: 'info' },
          { en: 'Pending Rejudge', cn: '因为数据更新或其他原因，系统将重新判你的答案', type: 'info' },
          { en: 'Compiling', cn: '正在编译', type: 'info' },
          { en: 'Running & Judging', cn: '正在运行和判断', type: 'info' },
          { en: 'Accepted', cn: '程序通过!', type: 'success' },
          { en: 'Presentation Error', cn: '答案基本正确，但是格式不对', type: 'warning' },
          { en: 'Wrong Answer', cn: '答案不对，仅仅通过样例数据的测试并不一定是正确答案，一定还有你没想到的地方', type: 'danger' },
          { en: 'Time Limit Exceeded', cn: '运行超出时间限制，检查下是否有死循环，或者应该有更快的计算方法', type: 'danger' },
          { en: 'Memory Limit Exceeded', cn: '超出内存限制，数据可能需要压缩，检查内存是否有泄露', type: 'danger' },
          { en: 'Output Limit Exceeded', cn: '输出超过限制，你的输出比正确答案长了两倍', type: 'danger' },
          { en: 'Runtime Error', cn: '运行时错误，非法的内存访问，数组越界，指针漂移，调用禁用的系统函数。请点击后获得详细输出', type: 'danger' },
          { en: 'Compile Error', cn: '编译错误，请点击后获得编译器的详细输出', type: 'danger' },
        ],
      },
      judgement: {
        title: '在线裁判系统使用编译器是什么',
        info: '我们采用的是微软开源代码编辑器Monaco Editor，它支持智能提示，代码高亮，代码格式化。',
      },
      browser: {
        title: '平台对浏览器兼容性如何？',
        info: 'IE不推荐！但是Chrome（50或以上），Firefox（50或以上），Edge都是推荐的。',
      },
      test: {
        title: '如何进行模拟竞赛?',
        info: '注册一个账号，进入平台后点击菜单栏上的公开竞赛，然后平台将随机生成一套模拟试卷进行检验',
      },
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
      .listTitle{
        font-size:20px;
        font-weight: bold;
      }
      .reply:nth-child(1){
        margin-top:20px;
      }
      .fontClass{
        font-size:15px;
        margin-top:20px;
        margin-left:30px;
      }
      .reply{
        position: relative;
        height: 40px;
        width: 80%;
        font-size: 15px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        .status{
          width:20%;
          text-align:center;
          .el-tag{
            width:150px;
          }
        }
        .mean{
          width:80%;
        }
      }
    }
  }
}
</style>
