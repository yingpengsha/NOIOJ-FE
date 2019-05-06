<template>
  <div>
    <div class="background" @click="unShow">
    </div>
    <div class="problemList" ref="list">
      <div class="header">
        <el-input
          placeholder="题目搜索"
          v-model="listQuery.title"
          @keyup.enter.native="handleToFilter"
          size="medium"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <main v-loading="loading">
        <el-table
          :data="list"
          :show-header="false"
          max-height="calc(100vh - 108px)"
          :row-style="{color: 'black', background:'#f6f6f6'}"
          @row-click="handleToProblemDetail"
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            width="40px">
          </el-table-column>
          <el-table-column
            prop="title">
          </el-table-column>
          <el-table-column
            align="center"
            width="60px">
            <template slot-scope="scope">
              {{difficulty[scope.row.difficulty]}}
            </template>
          </el-table-column>
        </el-table>
      </main>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.limit"
        layout="prev, pager, next, jumper"
        :total="total"
        v-show="total>0"
        style="width:300px;">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as problem from '@/api/problem';

export default {
  name: 'ProblemList',
  data() {
    return {
      total: 0,
      list: [],
      loading: true,
      listQuery: {
        limit: 50,
        page: 1,
        tags: null,
        difficulty: null,
        type: null,
        title: null,
        isFree: null,
        orderBy: null,
        packetId: null,
      },
      difficulty: ['入门', '简单', '中等', '困难', '超难'],
    };
  },
  props: {
    packetId: Number,
  },
  methods: {
    handleToFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleToProblemDetail(row) {
      this.reload(row.problemId);
    },
    getList() {
      this.loading = true;
      this.listQuery.packetId = this.packetId;
      problem.query(this.listQuery)
        .then((result) => {
          this.list = result.data.list;
          this.total = result.data.totalCount;
          this.loading = false;
        });
    },
    unShow() {
      this.changeClass();
      this.$emit('unShow');
    },
    reload(id) {
      this.unShow();
      this.$emit('reload', { id });
    },
    changeClass() {
      this.$refs.list.classList.add('hidden');
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.background{
  width: 100vw;
  height: 100vh;
  background:  rgba(0, 0, 0, .3);
  z-index: 100;
  position:fixed;
  top: 0;
  left: 0;
}
.problemList{
  padding: 10px;
  width: 600px;
  height: 100vh;
  background: $grayBack;
  position:fixed;
  z-index: 1000;
  top: 0;
  animation:show 0.3s cubic-bezier(0.19, 0.45, 0.53, 0.95);
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  .header{
    width: 100%;
  }
  main{
    height: 100%;
    margin: 10px 0;
  }
}
.hidden{
  animation:hidden 0.3s cubic-bezier(0.19, 0.45, 0.53, 0.95);
}
@keyframes show
{
  0%   {left: -600px;}
  100% {left: 0px;}
}
@keyframes hidden
{
  0%   {left: 0px;}
  100% {left: -600px;}
}
</style>
