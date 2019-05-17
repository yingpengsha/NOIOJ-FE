<template>
  <div id="lessonDetail">
    <section id="header">
      <div class="img" :style="(lesson.image || LessonDefault) | backFilter"/>
      <main>
        <div class="title">{{lesson.title}}</div>
        <p>
          <span>
            <b>难度：</b>
            <el-tag size="medium" :type="difficultyList[lesson.difficulty+1].style" style="margin-left:5px;">
              {{difficultyList[lesson.difficulty+1].name}}
            </el-tag>
          </span>
          <span>
            <b>类别：</b>
            <el-tag size="medium">{{classes[lesson.classId+1].name}}</el-tag>
          </span>
        </p>
      </main>
    </section>

    <section id="nav">
      <main>
        <span
          v-for="item in tabs"
          :key="item.key"
          :class="item.key===focus?'focus':null"
          @click="focus=item.key"
        >
          {{item.name}}
        </span>
      </main>
    </section>

    <section>
      <main>
        <list v-if="focus==='list'" :list="lesson.chapterList" :description="lesson.description" />
        <discuss v-else />
      </main>
    </section>
  </div>
</template>

<script>
import * as lesson from '@/api/lesson';
import LessonDefault from '@/assets/lesson-page/lesson-default.jpg';
import Discuss from './components/discuss.vue';
import List from './components/list.vue';

export default {
  name: 'LessonDetail',
  data() {
    return {
      lesson: {},
      LessonDefault,
      classes: [
        { name: '全部', value: null },
        { name: '数学', value: 0 },
        { name: '数据结构', value: 1 },
        { name: '算法', value: 2 },
      ],
      difficultyList: [
        { name: '全部', value: null },
        { name: '入门', value: 0, style: 'info' },
        { name: '初级', value: 1, style: 'success' },
        { name: '中级', value: 2, style: 'warning' },
        { name: '高级', value: 3, style: 'danger' },
      ],
      tabs: [
        { name: '课程章节', key: 'list' },
        { name: '课程讨论', key: 'discuss' },
      ],
      focus: 'list',
    };
  },
  methods: {
    getData() {
      lesson.detail(this.$route.params.id)
        .then((result) => {
          this.lesson = result.data;
        });
    },
  },
  created() {
    this.getData();
  },
  components: {
    Discuss,
    List,
  },
  filters: {
    backFilter(val) {
      return `background:url(${val});background-position: center;background-size: cover;`;
    },
  },
};
</script>

<style lang="scss" scoped>
#lessonDetail{
  main{
    width: 1000px;
    height: 100%;
    margin:0 auto;
    padding:30px;
  }
  #header{
    width:100%;
    height: 200px;
    position: relative;
    .img{
      width:100%;
      height: 200px;
      background: url('../../assets/questions-page/questions-background.png');
      background-position: center;
      background-size: cover;
      filter:brightness(0.3);
      position:absolute;
      top: 0;
      left: 0;
    }
    main{
      padding: 35px;
      color: white;
      position: relative;
      font-size: 300;
      .title{
        font-size: 36px;
        letter-spacing: 3px;
      }
      p{
        margin-top: 30px;
        span{
          margin-right: 20px;
        }
      }
    }
  }

  #nav{
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 60px;
    line-height: 60px;
    main{
      padding: 0 30px;
      span{
        padding:0 20px;
        letter-spacing: 2px;
        font-weight: bold;
        transition: all .2s;
        &:hover{
          cursor: pointer;
        }
      }
      .focus{
        color: $blue;
      }
    }
  }
}
</style>
