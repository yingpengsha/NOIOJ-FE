<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, key) in list"
        :key="key"
        :color="colorList[resultList[item.result].type]"
        :timestamp="item.inDate"
      >
        <el-card class="title" @click.native="handleToProblemDetail(item.problemId)">
          {{item.title | ellipsis}}
          <el-tag :type="resultList[item.result].type">
            {{resultList[item.result].en}}
          </el-tag>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-button
      round
      style="width:100%;"
      :loading="loading"
      v-show="list.length!==total"
      @click="getMoreList"
    >
      查看更多
    </el-button>
  </div>
</template>

<script>
import * as solution from '@/api/solution';
import { resultList } from '@/utils/OJ';

export default {
  name: 'SubmitLog',
  data() {
    return {
      loading: true,
      list: [],
      total: 0,
      listQuery: {
        limit: 5,
        page: 1,
        problemId: null,
      },
      colorList: {
        info: '#909399',
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
      },
      resultList,
    };
  },
  methods: {
    handleToProblemDetail(id) {
      this.$router.push({ name: 'problemDetail', params: { id } });
    },
    getMoreList() {
      this.listQuery.page += 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      solution.query(this.listQuery)
        .then((result) => {
          this.total = result.data.totalCount;
          this.list.push(...result.data.list);
          this.loading = false;
        });
    },
  },
  created() {
    this.getList();
  },
  filters: {
    ellipsis(value) {
      if (!value) return '';
      if (value.length > 50) {
        return `${value.slice(0, 50)}...`;
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.title{
  font-size: 18px;
  &:hover{
    cursor: pointer;
  }
}
</style>
