<template>
  <div id="lesson">
    <header>
      <main>
        <div class="selectList">
          <div class="title">课程类别:</div>
          <div
            v-for="item in classes"
            :key="item.value"
            @click="handleClass(item.value)"
            :class="listQuery.classId===item.value?'item focus':'item'"
          >
            {{item.name}}
          </div>
        </div>
        <div class="selectList">
          <span class="title">课程难度:</span>
          <div
            class="item"
            v-for="item in difficultyList"
            :key="item.value"
            @click="handleDifficulty(item.value)"
            :class="listQuery.difficulty===item.value?'item focus':'item'"
          >
            {{item.name}}
          </div>
        </div>
      </main>
    </header>

    <section>
      <main>
        <el-input v-model="listQuery.title" placeholder="请输入课程名" style="width:300px;"></el-input>
        <el-button type="success" style="margin:0 10px;" @click="handleFilter">搜索</el-button>
      </main>
    </section>

    <section>
      <main class="lessonList" v-loading="loading">
        <div
          class="lesson"
          v-for="(lesson,key) in list"
          :key="key"
          @click="handleToLessonDetail(lesson.courseId)"
        >
          <div class="img" :style="(lesson.image || LessonDefault) | backFilter"/>
          <div class="title">{{lesson.title}}</div>
          <div class="detail">
            <el-tag size="small">{{classes[lesson.classId+1].name}}</el-tag>
            <el-tag size="small" :type="difficultyList[lesson.difficulty+1].style" style="margin-left:5px;">
              {{difficultyList[lesson.difficulty+1].name}}
            </el-tag>
          </div>
        </div>
      </main>
    </section>

    <main style="padding:10px;">
      <el-pagination
        v-show="total>listQuery.limit"
        :current-page="listQuery.page"
        :page-size="listQuery.limit"
        :total="total"
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </main>
  </div>
</template>

<script>
import * as lesson from '@/api/lesson';
import LessonDefault from '@/assets/lesson-page/lesson-default.jpg';

export default {
  name: 'Lesson',
  data() {
    return {
      listQuery: {
        limit: 20,
        page: 1,
        title: null,
        classId: null,
        difficulty: null,
      },
      LessonDefault,
      list: [],
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
      loading: true,
      total: 0,
    };
  },
  methods: {
    handleToLessonDetail(id) {
      this.$router.push({ name: 'lessonDetail', params: { id } });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleClass(id) {
      this.listQuery.classId = id;
      this.handleFilter();
    },
    handleDifficulty(id) {
      this.listQuery.difficulty = id;
      this.handleFilter();
    },
    handleFilter() {
      this.page = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      lesson.query(this.listQuery)
        .then((result) => {
          if (result.code) {
            this.list = result.data.list;
            this.total = result.data.totalCount;
          } else {
            this.list = [];
            this.total = 0;
          }
          this.loading = false;
        });
    },
  },
  created() {
    this.getList();
  },
  filters: {
    backFilter(val) {
      return `background:url(${val});background-position: center;background-size: cover;`;
    },
  },
};
</script>

<style lang="scss" scoped>
#lesson{
  main{
    width: $detailWidth;
    height: 100%;
    margin:0 auto;
    padding:20px;
  }
  header{
    width: 100%;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .selectList{
      display: flex;
      font-size: 18px;
      font-weight: 300;
      margin: 10px 0;
      .item{
        width: 100px;
        margin:0 10px;
        font-size: 16px;
        text-align: center;
        transition: all .3s;
        line-height: 26px;
        border-radius: 5px;
        &:hover{
          cursor: pointer;
        }
      }
      .focus{
        color: white;
        background: $blue;
      }
    }
  }
  .lessonList{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding:0 10px;
    .lesson{
      margin:10px;
      width: calc(20% - 20px);
      background:white;
      border-radius: 3px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      &:hover{
        cursor: pointer;
      }
      .img{
        width:100%;
        height: 130px;
        border-radius: 4px 4px 0 0;
      }
      .title{
        font-size:18px;
        font-weight: 300;
        margin: 10px;
      }
      .detail{
        margin: 10px;
      }
    }
  }
}
</style>
